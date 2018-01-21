import {Component} from '@angular/core';
import {Camera, PerspectiveCamera} from 'three';
import {CameraProvider} from './camera-provider.service';
import {RendererProvider} from './renderer-provider.service';

@Component({selector: 'perspective-camera', template: '<ng-content></ng-content>'})
export class PerspectiveCameraComponent {

    constructor(cameraProvider: CameraProvider, rendererProvider: RendererProvider) {
        const renderer = rendererProvider.getRenderer();
        const rendererSize = renderer.getSize();
        const aspect = rendererSize.width / rendererSize.height;
        const perspectiveCamera = new PerspectiveCamera(75, aspect, 0.1, 1000);
        perspectiveCamera.position.x = -0.4;
        perspectiveCamera.position.z = 1;
        perspectiveCamera.position.y = 1;
        perspectiveCamera.fov = 70;
        cameraProvider.setCamera(perspectiveCamera);
    }
}
