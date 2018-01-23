import {AfterContentInit, Component, ContentChild, ContentChildren, QueryList} from '@angular/core';
import {Scene} from 'three';
import {PerspectiveCameraComponent} from './perspective-camera.component';
import {SceneProvider} from './scene-provider.service';
import {Object3dComponent} from './object3d.component';

@Component({
    selector: 'scene',
    template: '<ng-content></ng-content>'
})
export class SceneComponent implements AfterContentInit {

    private scene: Scene;

    @ContentChild(PerspectiveCameraComponent)
    perspectiveCameraComponent: PerspectiveCameraComponent;

    @ContentChildren(Object3dComponent)
    objects3d: QueryList<Object3dComponent> = new QueryList<Object3dComponent>();

    constructor(private sceneProvider: SceneProvider) {
        this.scene = this.sceneProvider.getScene();
    }

    ngAfterContentInit() {
      this.objects3d.forEach(p => this.scene.add(p.getObject3D()));
    }
}
