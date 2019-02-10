import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Camera, PerspectiveCamera, WebGLRenderer } from 'three';
import { AnimateProvider } from './animate-provider.service';
import { CanvasControllerComponent } from './canvas-controller.component';

@Component({
    selector: 'three-renderer',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class  RendererComponent implements OnInit, OnChanges, OnDestroy {


    @Input()
    public height = 100;

    @Input()
    public width = 100;

    public get Renderer() : WebGLRenderer {
        return this.renderer;
    }

    private readonly renderer: WebGLRenderer;
    private cameras: Map<object, Camera> = new Map();

    constructor(private canvasControllerComponent: CanvasControllerComponent,
                private animateProvider: AnimateProvider) {

      this.renderer = new WebGLRenderer({ antialias: true, canvas: canvasControllerComponent.Canvas });
    }

    public ngOnInit(): void {
        this.resize();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.resize();
    }

    public ngOnDestroy(): void {
        this.animateProvider.unsetFrameTask(this);
    }

    public resize(): void {
        const rendererWidth = this.width;
        const rendererHeight = this.height;

        this.renderer.setSize(rendererWidth, rendererHeight);
        this.renderer.setPixelRatio( window.devicePixelRatio );


        this.cameras.forEach((p) => {
            if (p instanceof PerspectiveCamera) {
                p.aspect = rendererWidth / rendererHeight;
                p.updateProjectionMatrix();
            }
        });
    }

    public getCamera(id?: object): Camera {
        return this.cameras.get(id);
    }

    public setCamera(camera: Camera, id?: object) : void {
        if(!this.cameras.has(id)) {
            this.cameras.set(id, camera);
        }
    }
}
