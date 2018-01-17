import {Geometry, Vector3} from 'three';

export class UvMapProjector {
    face(geometry: Geometry): void {
        let vertices = geometry.vertices;
        geometry.faces.forEach(face => {
            let a = vertices[face.a];
            let b = vertices[face.b];
            let c = vertices[face.c];
            let ab = b.sub(a);
            let ac = c.sub(a);
            let normal = ab.cross(ac).normalize();
            let z = new Vector3(0, 0, 1);
        })
    }
}
