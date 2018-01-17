import {BoxGeometry, Mesh, MeshLambertMaterial} from 'three';
import {Component, forwardRef} from '@angular/core';
import {Object3dComponent} from './object3d.component';

@Component({
    selector: 'box-control',
    template: '',
    providers: [{ provide: Object3dComponent, useExisting: forwardRef(() => BoxControlComponent) }]
})
export class BoxControlComponent extends Object3dComponent {

    constructor() {
        super();

        const boxGeometry = new BoxGeometry(1 , 1, 1);
        // const meshBasicMaterial = new MeshBasicMaterial({color: 0x00ff00});
        // const meshPhongMaterial = new MeshPhongMaterial({color: 0x00ff00, specular: 0x050505});
        const meshLambertMaterial = new MeshLambertMaterial({color: 0x00ff00});
        this.object3d = new Mesh(boxGeometry, meshLambertMaterial);
    }
}
