import {Component, forwardRef} from '@angular/core';
import {DirectionalLight} from 'three';
import {Object3dComponent} from './object3d.component';

@Component({
    selector: 'direct-light',
    template: '',
    providers: [{ provide: Object3dComponent, useExisting: forwardRef(() => DirectLightComponent) }]})
export class DirectLightComponent extends Object3dComponent {
    private directionalLight: DirectionalLight;

    constructor() {
        super();

        this.directionalLight = new DirectionalLight(0x606060);
        this.directionalLight.position.set(1, 1, 1);

        this.object3d = this.directionalLight;
    }
}
