import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Object3D, PerspectiveCamera } from 'three';
import { AnimateProvider } from './animate-provider.service';
import { CameraComponent } from './camera.component';
import { RendererComponent } from './renderer.component';
import { SceneComponent } from './scene.component';

@Component({
    selector: 'three-perspective-camera',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerspectiveCameraComponent extends CameraComponent {


    public get object() : Object3D {
        return this.perspectiveCamera;
    }

    private readonly perspectiveCamera: PerspectiveCamera;

    constructor(
        rendererComponent: RendererComponent,
        animateProvider: AnimateProvider,
        sceneComponent: SceneComponent,
    ) {
        super();
        const scene = sceneComponent.getScene();
        const renderer = rendererComponent.Renderer;
        const rendererSize = renderer.getSize();
        const aspect = rendererSize.width / rendererSize.height;
        this.perspectiveCamera = new PerspectiveCamera(75, 1.0, 0.1, 1000);
        rendererComponent.setCamera(this.perspectiveCamera);
        this.perspectiveCamera.aspect = aspect;
        this.perspectiveCamera.position.x = -0.4;
        this.perspectiveCamera.position.z = 1;
        this.perspectiveCamera.position.y = 1;
        this.perspectiveCamera.fov = 70;

        animateProvider.setFrameTask(this, () => renderer.render(scene, this.perspectiveCamera));
    }
}
