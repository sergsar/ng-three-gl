import { ChangeDetectionStrategy, Component, ContentChild, OnInit, } from '@angular/core';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {AnimateProvider} from './animate-provider.service';
import {CameraProvider} from './camera-provider.service';
import {CanvasProvider} from './canvas-provider.service';
import {RendererProvider} from './renderer-provider.service';
import { sceneProviderFactory } from './scene-provider.factory';
import {SceneProvider} from './scene-provider.service';
import {SceneComponent} from './scene.component';

@Component({
    selector: 'three-renderer',
    template: '<ng-content></ng-content>',
    providers: [{ provide: SceneProvider, useFactory: sceneProviderFactory}],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class  RendererComponent implements OnInit {

    @ContentChild(SceneComponent)
    public sceneComponent: SceneComponent;


    private context: CanvasRenderingContext2D;
    private renderer: WebGLRenderer;
    private canvas: HTMLCanvasElement;

    constructor(rendererProvider: RendererProvider,
                canvasProvider: CanvasProvider,
                private sceneProvider: SceneProvider,
                private cameraProvider: CameraProvider,
                private animateProvider: AnimateProvider) {
      this.canvas = canvasProvider.getCanvas();
      this.renderer = rendererProvider.setRenderer(new WebGLRenderer({ antialias: true }));
      this.context = canvasProvider.getContext();
    }

    public ngOnInit() : void {
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        this.renderer.setSize(canvasWidth, canvasHeight);

        const scene = this.sceneProvider.getScene();
        const camera = this.cameraProvider.getCamera();

        if (camera instanceof PerspectiveCamera) {
            camera.aspect = canvasWidth / canvasHeight;
            camera.updateProjectionMatrix();
        }

        const animateTask = () => {
          this.renderer.render(scene, camera);
          this.context.drawImage(this.renderer.domElement, 0, 0);
        }
        this.animateProvider.setFrameTask(this, animateTask);

        window.addEventListener( 'resize', () => this.onWindowResize(), false );
    }


    private onWindowResize() : void {
      const canvasWidth = this.canvas.width;
      const canvasHeight = this.canvas.height;
      this.renderer.setSize(canvasWidth, canvasHeight);
      const camera = this.cameraProvider.getCamera();
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = canvasWidth / canvasHeight;
        camera.updateProjectionMatrix();
      }
    }
}
