import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {Object3D as ThreeObject} from 'three';

@Component({template: ''})
export class Object3dComponent implements AfterContentInit {

    protected object3d: ThreeObject;

    @ContentChildren(Object3dComponent)
    private objects3D: QueryList<Object3dComponent> = new QueryList<Object3dComponent>();

    ngAfterContentInit() {
        this.objects3D.forEach(p => {
            const object = p.getObject3D();
            if (object !== this.object3d) {
                this.object3d.add(object);
            }
        });
    }

    public getObject3D(): ThreeObject {
        return this.object3d;
    }
}
