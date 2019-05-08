import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Subject, Subscribable } from 'rxjs';
import { Camera, PCFSoftShadowMap, PerspectiveCamera, Uncharted2ToneMapping, WebGLRenderer, WebGLRendererParameters } from 'three';
import { AnimateProvider } from './animate-provider.service';
import { CanvasControllerComponent } from './canvas-controller.component';
import { EventDispatcher, EventHandler } from './event-dispatcher';

@Component({
    selector: 'three-renderer',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class  RendererComponent implements OnDestroy {

    @Input()
    public set Shadows(value: boolean) {
        this.shadows = value;
        if(this.renderer) {
            this.renderer.shadowMap.enabled = value;
        }
    }

    public get Resize(): EventHandler {
        return this.resize;
    }

    public get Renderer() : WebGLRenderer {
        return this.renderer;
    }

    public get ChangeCamera(): Subscribable<any> {
        return this.changeCamera;
    }

    private readonly renderer: WebGLRenderer;
    private cameras: Map<object, Camera> = new Map();
    private readonly changeCamera: Subject<any> = new Subject();
    private readonly resize: EventDispatcher = new EventDispatcher();
    private activeCamera: Camera;
    private shadows: boolean;

    constructor(
        private canvasControllerComponent: CanvasControllerComponent,
        private animateProvider: AnimateProvider,
    ) {

        const rendererParameters: WebGLRendererParameters = {
            antialias: true,
            canvas: canvasControllerComponent.Canvas
        };

        this.renderer = new WebGLRenderer(rendererParameters);
        this.renderer.autoClear = true;

        this.renderer.shadowMap.enabled = this.shadows;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.toneMapping = Uncharted2ToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.toneMappingWhitePoint = 1.0;

        canvasControllerComponent.Resize.add(this.onResize)

        animateProvider.setFrameTask(this, this.renderTask);
    }

    public ngOnDestroy(): void {
        this.canvasControllerComponent.Resize.remove(this.onResize);
        this.animateProvider.unsetFrameTask(this);
    }

    public getCamera(idOrInstance?: Camera | any): Camera {
        const found = this.cameras.get(idOrInstance);
        if(found) {
            return found;
        }
        const registeredInstances = Array.from(this.cameras.values());
        return registeredInstances.find(c => c === idOrInstance);
    }

    public getActiveCamera(): Camera {
        return this.activeCamera;
    }

    public setActiveCamera(idOrInstance: Camera | any): void {
        const found = this.getCamera(idOrInstance);
        if(!found) {
            console.warn(`trying to set active non existing camera id or instance ${idOrInstance} - ignored`);
            return;
        }
        this.activeCamera = found;
        this.changeCamera.next(this.activeCamera);
    }

    public addCamera(camera: Camera, id?: object) : void {
        if(this.getCamera(id) || this.getCamera(camera)) {
            console.warn(`trying to add already existing camera id or instance - ignored`);
            return;
        }
        this.cameras.set(id, camera);
        if(!this.activeCamera) {
            this.setActiveCamera(id);
        }
    }

    public removeCamera(idOrInstance: Camera | any): void {
        let camera: Camera;
        if(this.cameras.has(idOrInstance))
        {
            camera = this.cameras.get(idOrInstance);
            this.cameras.delete(idOrInstance);
        } else {
            const registeredInstances = Array.from(this.cameras.values());
            const registeredKeys = Array.from(this.cameras.keys());
            camera = registeredInstances.find(idOrInstance);

            if (camera) {
                const fondIndex = registeredInstances.findIndex(o => o === camera);
                const foundId = registeredKeys[fondIndex];
                this.cameras.delete(foundId);
            }
        }
        if(this.activeCamera === camera) {
            this.activeCamera = null;
            const registeredInstances = Array.from(this.cameras.values());
            this.setActiveCamera(registeredInstances[0]);
        }
    }

    private onResize = (width: number, height: number) : void => {
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.resize.dispatch(width, height);
    }

    private renderTask = (): void => {
        if(this.activeCamera) {
            this.activeCamera.dispatchEvent({ type: 'render-task' });
        }
    }
}
