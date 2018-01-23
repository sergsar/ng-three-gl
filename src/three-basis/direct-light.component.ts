import {Component} from '@angular/core';
import {DirectionalLight} from 'three';
import {Object3dComponent} from './object3d.component';
import {object3dProviderFactory} from './object3d-provider.factory';

@Component({
    selector: 'direct-light',
    template: '',
    providers: [object3dProviderFactory(DirectLightComponent)]
})
export class DirectLightComponent extends Object3dComponent {
    private directionalLight: DirectionalLight;

    constructor() {
        super();

        this.directionalLight = new DirectionalLight(0x999999);
        this.directionalLight.position.set(1, 1, 1);

        this.object3d = this.directionalLight;
    }
}
