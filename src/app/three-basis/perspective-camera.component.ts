import {Component} from '@angular/core';
import {PerspectiveCamera} from 'three';
import {CameraProvider} from './camera-provider.service';

@Component({selector: 'perspective-camera', template: '<ng-content></ng-content>'})
export class PerspectiveCameraComponent {

    public perspectiveCamera: PerspectiveCamera;

    constructor(private cameraProvider: CameraProvider) {
        let perspectiveCameraSetupFn = () => new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.perspectiveCamera = this.cameraProvider.getPerspectiveCamera(perspectiveCameraSetupFn);
        this.perspectiveCamera.position.z = 5;
    }
}
