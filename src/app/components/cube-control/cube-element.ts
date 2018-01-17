import {Material, Object3D} from 'three';

export abstract class CubeElement {
    protected material: Material;
    protected element: Object3D;

    public getElement(): Object3D {
        return this.element;
    }
}
