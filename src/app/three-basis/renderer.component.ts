import {Component, Input, ContentChild, OnInit} from '@angular/core';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {SceneComponent} from './scene.component';
import {RendererProvider} from './renderer-provider.service';
import {CanvasProvider} from './canvas-provider.service';
import {SceneProvider} from './scene-provider.service';
import {CameraProvider} from './camera-provider.service';
import {AnimateProvider} from './animate-provider.service';

@Component({ selector: 'renderer', template: '<ng-content></ng-content>' })
export class  RendererComponent implements OnInit {

    // in future render can be smaller than canvas
    @Input()
    private height = 100;

    @Input()
    private width = 100;

    @ContentChild(SceneComponent)
    sceneComponent: SceneComponent;

    private context: CanvasRenderingContext2D;
    private renderer: WebGLRenderer;

    constructor(rendererProvider: RendererProvider,
                canvasProvider: CanvasProvider,
                private sceneProvider: SceneProvider,
                private cameraProvider: CameraProvider,
                private animateProvider: AnimateProvider) {
      const canvas = canvasProvider.getCanvas();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      this.renderer = rendererProvider.setRenderer(new WebGLRenderer({ antialias: true }));
      this.renderer.setSize( screenWidth, screenHeight );

      this.context = canvas.getContext('2d');
    }

    public ngOnInit() {
        const scene = this.sceneProvider.getScene();
        const camera = this.cameraProvider.getCamera();

        const animateTask = () => {
          this.renderer.render(scene, camera);
          this.context.drawImage(this.renderer.domElement, 0, 0);
        }
        this.animateProvider.setFrameTask(this, animateTask);

        // window.removeEventListener('resize', this.onWindowResize);
        window.addEventListener( 'resize', () => this.onWindowResize(), false );
    }

    private onWindowResize() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      this.renderer.setSize(screenWidth, screenHeight);
      const camera = this.cameraProvider.getCamera();
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = screenWidth / screenHeight;
        camera.updateProjectionMatrix();
      }
    }
}
