import {Component} from '@angular/core';
import {CameraProvider} from './camera-provider.service';
import {CanvasProvider} from './canvas-provider.service';

declare var require: any;
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

@Component({selector: 'camera-orbit-control', template: ''})
export class CameraOrbitControlComponent {

    constructor(cameraProvider: CameraProvider, canvasProvider: CanvasProvider) {
      const perspectiveCamera = cameraProvider.getCamera();
      const controls = new OrbitControls(perspectiveCamera, canvasProvider.getCanvas());
      const degToRad = Math.PI / 180;
      controls.minAzimuthAngle = -60 * degToRad;
      controls.maxAzimuthAngle = 60 * degToRad;
      controls.minPolarAngle = 30 * degToRad;
      controls.maxPolarAngle = 70 * degToRad;
      controls.minDistance = 1;
      controls.maxDistance = 2;
      // controls.enableDamping = true;
      // controls.dampingFactor = 0.5;
      controls.enablePan = false;


      controls.addEventListener('change', () => {});
    }
}
