import { ChangeDetectionStrategy, Component } from '@angular/core';
import {DirectionalLight} from 'three';
import { GroupProvider } from './group-provider.service';
import {Object3dComponent} from './object3d.component';

@Component({
    selector: 'three-direct-light',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectLightComponent extends Object3dComponent {


    constructor(groupProvider: GroupProvider) {
        super(groupProvider);

        const directionalLight = new DirectionalLight(0x999999);
        directionalLight.position.set(1, 1, 1);

        this.Group.add(directionalLight);
    }
}
