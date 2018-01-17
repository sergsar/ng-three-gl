import {BufferGeometry, Vector3, Float32BufferAttribute, Mesh, Material} from 'three';
import {CubeElement} from './cube-element';

export class CubeSerialElement extends CubeElement {
    constructor(value1: number, value2: number, height: number, material: Material) {

        super();

        this.material = material;

        let positions = [];
        let normals = [];
        let uv = [];
        let geometry = new BufferGeometry();

        let v1 = value1, v2 = value2, h = height;
        let half = new Vector3(1, 0, 1).multiplyScalar(0.5);

        // points:
        let p11 = new Vector3(v2, 0, 0).sub(half), p12 = new Vector3(v2, h, 0).sub(half), p13 = new Vector3(v1, h, 0).sub(half), p14 = new Vector3(v1, 0, 0).sub(half);
        let p21 = new Vector3(v2, 0, v2).sub(half), p22 = new Vector3(v2, h, v2).sub(half), p23 = new Vector3(v1, h, v1).sub(half);
        let p31 = new Vector3(0, 0, v2).sub(half), p32 = new Vector3(0, h, v2).sub(half), p33 = new Vector3(0, h, v1).sub(half), p34 = new Vector3(0, 0, v1).sub(half);

        // triangles and manual uv example:
        positions.push(p11.x, p11.y, p11.z, p13.x, p13.y, p13.z, p12.x, p12.y, p12.z);
        uv.push(0, 0, v2 - v1, h, 0, h);
        positions.push(p11.x, p11.y, p11.z, p14.x, p14.y, p14.z, p13.x, p13.y, p13.z);
        uv.push(0, 0, v2 - v1, 0, v2 - v1, h);
        positions.push(p11.x, p11.y, p11.z, p12.x, p12.y, p12.z, p21.x, p21.y, p21.z);
        uv.push(v2, 0, v2, h, 0, 0);
        positions.push(p12.x, p12.y, p12.z, p22.x, p22.y, p22.z, p21.x, p21.y, p21.z);
        uv.push(v2, h, 0, h, 0, 0);
        positions.push(p12.x, p12.y, p12.z, p23.x, p23.y, p23.z, p22.x, p22.y, p22.z);
        uv.push(v2, 1, v1, 1 - v1, v2, 1 - v2); //
        positions.push(p12.x, p12.y, p12.z, p13.x, p13.y, p13.z, p23.x, p23.y, p23.z);
        uv.push(v2, 1, v1, 1, v1, 1 - v1);
        positions.push(p21.x, p21.y, p21.z, p22.x, p22.y, p22.z, p31.x, p31.y, p31.z);
        uv.push(1, 0, 1, h, 0, 0);
        positions.push(p22.x, p22.y, p22.z, p32.x, p32.y, p32.z, p31.x, p31.y, p31.z);
        uv.push(1, h, 0, h, 0, 0);
        positions.push(p22.x, p22.y, p22.z, p23.x, p23.y, p23.z, p32.x, p32.y, p32.z);
        uv.push(v2, 1 - v2, v1, 1 - v1, 0, 1 - v2);
        positions.push(p23.x, p23.y, p23.z, p33.x, p33.y, p33.z, p32.x, p32.y, p32.z);
        uv.push(v1, 1 - v1, 0, 1 - v1, 0, 1 - v2);
        positions.push(p31.x, p31.y, p31.z, p33.x, p33.y, p33.z, p34.x, p34.y, p34.z);
        uv.push(v2, 0, v1, h, v1, 0);
        positions.push(p31.x, p31.y, p31.z, p32.x, p32.y, p32.z, p33.x, p33.y, p33.z);
        uv.push(v2, 0, v2, h, v1, h);

        let pA = new Vector3();
        let pB = new Vector3();
        let pC = new Vector3();
        let ba = new Vector3();
        let ca = new Vector3();
        let nx, ny, nz: number;

        let i = -1;
        while (i <= positions.length) {
            pA.set(positions[++i], positions[++i], positions[++i]);
            pB.set(positions[++i], positions[++i], positions[++i]);
            pC.set(positions[++i], positions[++i], positions[++i]);
            ba.subVectors(pB, pA);
            ca.subVectors(pC, pA);
            ba.cross(ca).normalize();
            nx = ba.x; ny = ba.y; nz = ba.z;
            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);
        }


        function disposeArray() { this.array = null; }

        geometry.addAttribute('position', new Float32BufferAttribute(positions, 3).onUpload(disposeArray));
        geometry.addAttribute('normal', new Float32BufferAttribute(normals, 3).onUpload(disposeArray));
        geometry.addAttribute('uv', new Float32BufferAttribute(uv, 2).onUpload(disposeArray));

        geometry.computeBoundingBox();

        this.element = new Mesh( geometry, this.material );
    }
}
