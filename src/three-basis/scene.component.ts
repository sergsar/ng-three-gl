import {Component, ContentChild} from '@angular/core';
import {Scene} from 'three';
import {PerspectiveCameraComponent} from './perspective-camera.component';
import {SceneProvider} from './scene-provider.service';
import {Object3dComponent} from './object3d.component';
import {object3dProviderFactory} from './object3d-provider.factory';

@Component({
    selector: 'scene',
    template: '<ng-content></ng-content>',
    providers: [object3dProviderFactory(SceneComponent)]
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
