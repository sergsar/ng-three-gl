import {Geometry, Vector3} from 'three';

export class UvMapProjector {
    face(geometry: Geometry): void {
        const vertices = geometry.vertices;
        geometry.faces.forEach(face => {
            const a = vertices[face.a];
            const b = vertices[face.b];
            const c = vertices[face.c];
            const ab = b.sub(a);
            const ac = c.sub(a);
            const normal = ab.cross(ac).normalize();
            const z = new Vector3(0, 0, 1);
        })
    }
}
