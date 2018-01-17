import {Component} from '@angular/core';
import {CameraProvider} from './camera-provider.service';
import {RendererProvider} from './renderer-provider.service';
import {OrbitControls} from 'three-orbitcontrols-ts';
import {PerspectiveCamera} from 'three';

@Component({selector: 'camera-orbit-control', template: ''})
export class CameraOrbitControlComponent {

    constructor(private cameraProvider: CameraProvider) {
        const perspectiveCamera = this.cameraProvider.getPerspectiveCamera();
        const controls = new OrbitControls(perspectiveCamera);
        // controls.addEventListener('change', () => {});
    }

}
