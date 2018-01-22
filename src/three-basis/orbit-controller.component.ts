import {Component} from '@angular/core';
import {CanvasProvider} from './canvas-provider.service';
import {Controller} from './controller';

declare var require: any;
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

@Component({selector: 'orbit-controller', template: ''})
export class OrbitControllerComponent implements Controller {

    constructor(private canvasProvider: CanvasProvider) { }

    public setControllable(controllable: Object) {
      const controls = new OrbitControls(controllable, this.canvasProvider.getCanvas());
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
