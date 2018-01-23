import {Component} from '@angular/core';
import {Object3D} from 'three';

@Component({template: ''})
export class Object3dComponent {

    protected object3d: Object3D;

    public getObject3D(): Object3D {
        return this.object3d;
    }
}
