import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Camera, Event, Object3D, Scene } from 'three';
import { RendererComponent } from './renderer.component';
import { CanvasControllerComponent } from './canvas-controller.component';
import { SceneComponent } from './scene.component';

declare var require: any;
const THREE = require('three');
const TransformControls = require('three-transform-controls')(THREE);

@Component({ selector: 'three-transform-controller', template: '' })
export class TransformControllerComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    public controllable: Object3D;

    @Input()
    public mode: string;

    @Input()
    public visible: boolean;

    @Output()
    public readonly positionChanged: EventEmitter<any> = new EventEmitter();

    private controls: THREE.TransformControls;
    private blockedControls: Object[] = [];
    private readonly scene: Scene;
    private readonly canvas: HTMLCanvasElement;
    private readonly camera: Camera;

    constructor(canvasControllerComponent: CanvasControllerComponent, rendererComponent: RendererComponent, sceneComponent: SceneComponent) {
        this.scene = sceneComponent.getScene();
        this.canvas = canvasControllerComponent.Canvas;
        this.camera = rendererComponent.getCamera();
    }

    public ngOnInit(): void {

        this.controls = new TransformControls(this.camera, this.canvas);
        this.controls.attach(this.controllable);

        this.scene.add(this.controls);

        this.controls.addEventListener('objectChange', (e) => this.emit(e));

        const wrapper = this.scene.getObjectByName('orbit-controls');

        const orbitControls = wrapper && wrapper.userData;

        this.blockedControls.push(orbitControls);

        this.controls.addEventListener('objectChange', (e) => this.setEnabledBlockedControls(false));
        this.controls.addEventListener('mouseUp', (e) => this.setEnabledBlockedControls(true));

        this.controls.visible = false;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        for (const propName of Object.keys(changes)) {
            const change = changes[propName];
            this[propName] = change.currentValue;
        }
        this.setTransformMode();
        this.setEnabled();
    }

    public ngOnDestroy(): void {
        this.scene.remove(this.controls);
    }

    private emit(e: Event): void {
        this.positionChanged.emit([this.controllable.position.x, this.controllable.position.y, this.controllable.position.z]);
    }

    private setTransformMode() : void {
        if(this.controls) {
            this.controls.setMode(this.mode || 'translate');
        }
    }

    private setEnabled() : void {
        if(this.controls) {
            this.controls.visible = this.visible;
        }
    }

    private setEnabledBlockedControls(value: boolean) : void {
        this.blockedControls.forEach(p => p[('enabled')] = value);
    }
}
