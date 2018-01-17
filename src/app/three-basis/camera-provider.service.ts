import {Injectable} from '@angular/core';
import {PerspectiveCamera} from 'three';

@Injectable()
export class CameraProvider {
    private perspectiveCameras: Map<string, PerspectiveCamera> = new Map();

    public getPerspectiveCamera(fn?: () => PerspectiveCamera, id?: string): PerspectiveCamera {
        if (fn == null) {
            fn = () => new PerspectiveCamera();
        }

        let perspectiveCamera = this.perspectiveCameras.get(id);

        if (perspectiveCamera == null) {
            perspectiveCamera = fn();
            this.perspectiveCameras.set(id, perspectiveCamera);
        }

        return perspectiveCamera;
    }
}