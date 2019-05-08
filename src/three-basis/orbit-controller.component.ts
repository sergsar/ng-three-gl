import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Group, Object3D, Vector3 } from 'three';
import { CameraComponent } from './camera.component';
import { CanvasControllerComponent } from './canvas-controller.component';
import { GroupProvider } from './group-provider.service';
import { SceneComponent } from './scene.component';

declare var require: any;
const THREE = require('three');
const OrbitControls = require('../assets/js/orbit-controls-three')(THREE);

@Component({selector: 'three-orbit-controller', template: ''})
export class OrbitControllerComponent implements OnInit, OnDestroy {

    @Input()
    public controllable: Object;

    @Input()
    public camera: any;

    @Input()
    public positionX: number = 0.0;

    @Input()
    public positionY: number = 0.0;

    @Input()
    public positionZ: number = 0.0;

    private get position(): Vector3 {
        return new Vector3(this.positionX, this.positionY, this.positionZ);
    }

    private wrapper: Object3D;
    private controls: THREE.OrbitControls;

    constructor(private canvasControllerComponent: CanvasControllerComponent,
                private sceneComponent: SceneComponent,
    ) { }

    public ngOnInit(): void {
        this.createControls();
    }

    public ngOnDestroy(): void {
        this.sceneComponent.getScene().remove(this.wrapper);
        this.camera.removeEventListener('start-render', this.onStartRender);
    }

    private createControls(): void {
        const canvas = this.canvasControllerComponent.Canvas
        // TODO: fix canvas event
        this.controls = new OrbitControls(this.camera, this.camera, canvas);
        const degToRad = Math.PI / 180;
        this.controls.minAzimuthAngle = -60 * degToRad;
        this.controls.maxAzimuthAngle = 60 * degToRad;
        this.controls.minPolarAngle = 30 * degToRad;
        this.controls.maxPolarAngle = 130 * degToRad;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 2;
        // this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.5;
        this.controls.enablePan = false;
        this.controls.target = this.position;

        const scene = this.sceneComponent.getScene();
        this.wrapper = new Group();
        this.wrapper.userData = this.controls;
        this.wrapper.name = 'orbit-controls';
        scene.add(this.wrapper);

        this.camera.addEventListener('start-render', this.onStartRender);

        // controls.addEventListener('change', () => console.log('control changing'));
    }

    private onStartRender = () => {
        this.controls.target = this.position;
        this.controls.update();
    }
}
