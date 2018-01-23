import {NgModule} from '@angular/core';

import {RendererComponent} from './renderer.component';
import {SceneComponent} from './scene.component';
import {PerspectiveCameraComponent} from './perspective-camera.component';
import {ThreeAreaComponent} from './three-area.component';
import {DirectLightComponent} from './direct-light.component';
import {HemisphereLightComponent} from './hemisphere-light.component';
import {RendererProvider} from './renderer-provider.service';
import {CameraProvider} from './camera-provider.service';
import {SceneProvider} from './scene-provider.service';
import {OrbitControllerComponent} from './orbit-controller.component';
import {AnimateProvider} from './animate-provider.service';
import {Object3dComponent} from './object3d.component';
import {Group3dComponent} from './group3d.component';

@NgModule({
    imports: [],
    declarations: [
      ThreeAreaComponent,
      DirectLightComponent,
      HemisphereLightComponent,
      RendererComponent,
      SceneComponent,
      PerspectiveCameraComponent,
      OrbitControllerComponent,
      Object3dComponent,
      Group3dComponent
    ],
    exports: [
      ThreeAreaComponent,
      DirectLightComponent,
      HemisphereLightComponent,
      RendererComponent,
      SceneComponent,
      PerspectiveCameraComponent,
      OrbitControllerComponent,
      Object3dComponent,
      Group3dComponent
    ],
    providers: [
      AnimateProvider,
      RendererProvider,
      CameraProvider,
      SceneProvider
    ]
})

export  class ThreeBasisModule {}
