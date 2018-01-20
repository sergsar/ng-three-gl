import {Mesh, BoxGeometry, Vector3, Material} from 'three';
import {CubeElement} from './cube-element';
import {UvMapProjector} from '../../three-basis/uv-map-projector';

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
