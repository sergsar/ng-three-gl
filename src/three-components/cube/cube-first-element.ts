import { BoxGeometry, Material, Mesh, Vector3 } from 'three';
import {UvMapProjector} from '../../three-basis/uv-map-projector';
import { CubeElement } from './cube-element';

export class CubeFirstElement extends CubeElement {


    constructor(value: number, height: number, material: Material) {
        super();
        this.material = material;
        const boxGeometry = new BoxGeometry(value, height, value);
        const uvMapProjector = new UvMapProjector();
        const element = new Mesh(boxGeometry, this.material);
        element.translateOnAxis(new Vector3(value - 1, height, value - 1).multiplyScalar(0.5), 1);
        uvMapProjector.box(boxGeometry);
        this.element = element;
    }
}
