import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'three';
import { CanvasControllerComponent } from './canvas-controller.component';
import { SceneComponent } from './scene.component';

declare var require: any;
const THREE = require('three');
const OrbitControls = require('orbit-controls-three')(THREE);

@Component({selector: 'three-orbit-controller', template: ''})
export class OrbitControllerComponent implements OnInit {

    @Input()
    public controllable: Object;

    constructor(private canvasControllerComponent: CanvasControllerComponent, private sceneComponent: SceneComponent) { }

    public ngOnInit(): void {
        const canvas = this.canvasControllerComponent.Canvas
        // TODO: fix canvas event
        const controls = new OrbitControls(this.controllable, canvas);
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

        const scene = this.sceneComponent.getScene();
        const wrapper = new Group();
        wrapper.userData = controls;
        wrapper.name = 'orbit-controls';
        scene.add(wrapper);

        // controls.addEventListener('change', () => console.log('control changing'));
    }
}
