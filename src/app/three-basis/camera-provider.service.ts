import {Injectable} from '@angular/core';
import {Camera} from 'three';

@Injectable()
export class CameraProvider {
    private cameras: Map<string, Camera> = new Map();

    public getCamera(id?: string): Camera {
        return this.cameras.get(id);
    }

    public setCamera(camera: Camera, id?: string): Camera {
      this.cameras.set(id, camera);
      return camera;
    }
}
