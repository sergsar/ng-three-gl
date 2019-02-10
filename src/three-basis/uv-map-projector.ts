import {Geometry, Vector3} from 'three';

export class UvMapProjector {

    public box(geometry: Geometry): void {
        const vertices = geometry.vertices;
        const directions = new Map([[new Vector3(1, 0, 0), ['y', 'z']], [new Vector3(0, 1, 0), ['x', 'z']], [new Vector3(0, 0, 1), ['x', 'y']]]);
        const faces = geometry.faces;
        const faceVertexUvs = geometry.faceVertexUvs;
        for (let i = 0; i < faces.length; i++) {
            const face = faces[i];
            const a = vertices[face.a].clone();
            const b = vertices[face.b].clone();
            const c = vertices[face.c].clone();
            const ab = b.sub(a);
            const ac = c.sub(a);
            const normal = ab.cross(ac).normalize();
            let direction = directions[0];
            let dot = 0;
            directions.forEach((ax, vec, map) => {
              const dotAbs = Math.abs(vec.dot(normal));
              if (dotAbs > dot) {
                dot = dotAbs;
                direction = vec;
              }
            });
            const axis = directions.get(direction);
            const faceUv = faceVertexUvs[0][i];
            faceUv[0].x = vertices[face.a][axis[0]] - 0.5;
            faceUv[0].y = -vertices[face.a][axis[1]] + 0.5;
            faceUv[1].x = vertices[face.b][axis[0]] - 0.5;
            faceUv[1].y = -vertices[face.b][axis[1]] + 0.5;
            faceUv[2].x = vertices[face.c][axis[0]] - 0.5;
            faceUv[2].y = -vertices[face.c][axis[1]] + 0.5;
        }
    }
}
