import {Injectable} from '@angular/core';
import {Scene} from 'three';

@Injectable()
export class SceneProvider {
    private scenes: Map<string, Scene> = new Map()

    public getScene(id?: string): Scene {

        let scene = this.scenes.get(id);

        if (scene == null) {
            scene = new Scene();
            this.scenes.set(id, scene);
        }

        return scene;
    }
}
