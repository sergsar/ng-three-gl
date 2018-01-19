import {Component} from '@angular/core';
import {CameraProvider} from './camera-provider.service';

declare var require: any;
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

@Component({selector: 'camera-orbit-control', template: ''})
export class CameraOrbitControlComponent {

    constructor(cameraProvider: CameraProvider) {
      const perspectiveCamera = cameraProvider.getCamera();
      const controls = new OrbitControls(perspectiveCamera);
      controls.addEventListener('change', () => {});
    }
}
