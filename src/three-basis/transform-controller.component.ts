// tslint:disable: no-duplicate-imports no-import-side-effect ordered-imports

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { Camera, Event, Object3D, PerspectiveCamera, Scene } from 'three';
import { CanvasControllerComponent } from './canvas-controller.component';
import { RendererComponent } from './renderer.component';
import { SceneComponent } from './scene.component';

import * as THREE from 'three';
import '../assets/js/three/EnableThreeExamples';
import '../assets/js/three/controls/TransformControls';

@Component({ selector: 'three-transform-controller', template: '' })
export class TransformControllerComponent implements OnInit, OnDestroy {
    @Input()
    public controllable: Object3D;

    @Input()
    public set mode(value: string) {
        this.setTransformMode(value || 'translate');
    }

    @Input()
    public set visible(value: boolean) {
        this.setEnabled(value || false);
    }

    @Output()
    public readonly positionChanged: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly rotationChanged: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly scaleChanged: EventEmitter<any> = new EventEmitter();

    private get camera(): Camera {
        return this.rendererComponent.getActiveCamera();
    }

    private controls: THREE.TransformControls;
    private readonly scene: Scene;
    private readonly canvas: HTMLCanvasElement;
    private changeCameraSubscription: Unsubscribable;

    constructor(canvasControllerComponent: CanvasControllerComponent,
                private rendererComponent: RendererComponent,
                sceneComponent: SceneComponent) {
        this.scene = sceneComponent.getScene();
        this.canvas = canvasControllerComponent.Canvas;
    }

    public ngOnInit(): void {
        this.createControls();

        this.changeCameraSubscription = this.rendererComponent.ChangeCamera.subscribe(this.onChangeCamera);
    }

    public ngOnDestroy(): void {
        this.scene.remove(this.controls);
        this.changeCameraSubscription.unsubscribe();
    }

    private createControls(): void {
        if(!this.camera) {
            return;
        }
        this.controls = new THREE.TransformControls(this.camera, this.canvas);

        this.scene.add(this.controls);

        this.controls.addEventListener('objectChange', (e) => this.emit(e));

        this.controls.addEventListener('objectChange', (e) => this.setEnabledBlockedControls(false));
        this.controls.addEventListener('mouseUp', (e) => this.setEnabledBlockedControls(true));
    }

    private onChangeCamera = (camera: PerspectiveCamera) => {
        if(!this.controls) {
            this.createControls();
        }
        this.controls[('camera')] = camera;
    }

    private emit(e: Event): void {

        this.positionChanged.emit({
            x: this.controllable.position.x,
            y: this.controllable.position.y,
            z: this.controllable.position.z });
        this.rotationChanged.emit({
            x: this.controllable.rotation.x * 180.0 / Math.PI,
            y: this.controllable.rotation.y * 180.0 / Math.PI,
            z: this.controllable.rotation.z * 180.0 / Math.PI });
        this.scaleChanged.emit({
            x: this.controllable.scale.x,
            y: this.controllable.scale.y,
            z: this.controllable.scale.z });
    }

    private setTransformMode(value: string) : void {
        if(this.controls) {
            this.controls.setMode(value);
        }
    }

    private setEnabled(value: boolean) : void {
        if(this.controls) {
            if(value) {
                this.controls.attach(this.controllable);
            } else {
                this.controls.detach();
            }
        }
    }

    private setEnabledBlockedControls(value: boolean) : void {
        const blockedControls = this.scene.children.filter(o => o.name === 'orbit-controls').map(o => o.userData);
        blockedControls.forEach(p => p[('enabled')] = value);
    }
}
