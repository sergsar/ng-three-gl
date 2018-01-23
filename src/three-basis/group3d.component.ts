import {Component} from '@angular/core';
import {Group} from 'three';
import {Object3dComponent} from './object3d.component';
import {object3dProviderFactory} from './object3d-provider.factory';

@Component({
    selector: 'group-3d',
    template: '<ng-content></ng-content>',
    providers: [object3dProviderFactory(Group3dComponent)]
})
export class Group3dComponent extends Object3dComponent {
    constructor() {
        super();
        this.object3d = new Group();
    }
}
