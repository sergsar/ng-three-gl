import {Component, forwardRef} from '@angular/core';
import {Group} from 'three';
import {Object3dComponent} from '../three-basis/object3d.component';

@Component({
    selector: 'group-3d',
    template: '<ng-content></ng-content>',
    providers: [{ provide: Object3dComponent, useExisting: forwardRef(() => Group3dComponent)}]
})
export class Group3dComponent extends Object3dComponent {
    constructor() {
        super();
        this.object3d = new Group();
    }
}
