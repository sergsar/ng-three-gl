import {Component, ContentChild, forwardRef} from '@angular/core';
import {Scene} from 'three';
import {PerspectiveCameraComponent} from './perspective-camera.component';
import {SceneProvider} from './scene-provider.service';
import {Object3dComponent} from './object3d.component';

@Component({
    selector: 'scene',
    templateUrl: './scene.component.html',
    providers: [{ provide: Object3dComponent, useExisting: forwardRef(() => SceneComponent) }]
})
export class SceneComponent extends Object3dComponent {
    @ContentChild(PerspectiveCameraComponent)
    perspectiveCameraComponent: PerspectiveCameraComponent;



    constructor(private sceneProvider: SceneProvider) {
        super();
        this.object3d = this.sceneProvider.getScene();
    }

    public get scene(): Scene {
        return this.object3d as Scene;
    }
}
