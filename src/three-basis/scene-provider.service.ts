import { ElementRef, Inject, Injectable } from '@angular/core';
import {Scene} from 'three';

@Injectable()
export class SceneProvider {
    private scenes: Map<object, Scene> = new Map();
    private parentSceneProvider: SceneProvider;

    public getScene(id?: object): Scene {

        let scene = this.scenes.get(id);

        if (scene === undefined) {
            scene = new Scene();
            this.scenes.set(id, scene);
        }

        return scene;
    }

    public removeScene(id?: object) : void {
        this.scenes.delete(id);
    }
}
