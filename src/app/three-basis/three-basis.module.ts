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
import {CameraOrbitControlComponent} from './camera-orbit-control.component';
import {AnimateProvider} from './animate-provider.service';
import {BoxControlComponent} from './box-control.component';
import {Object3dComponent} from './object3d.component';

@NgModule({
    imports: [],
    declarations: [
        ThreeAreaComponent,
        DirectLightComponent,
        HemisphereLightComponent,
        RendererComponent,
        SceneComponent,
        PerspectiveCameraComponent,
        CameraOrbitControlComponent,
        BoxControlComponent,
        Object3dComponent
    ],
    exports: [
        ThreeAreaComponent,
        DirectLightComponent,
        HemisphereLightComponent,
        RendererComponent,
        SceneComponent,
        PerspectiveCameraComponent,
        CameraOrbitControlComponent,
        BoxControlComponent,
        Object3dComponent
    ],
    providers: [
        AnimateProvider,
        RendererProvider,
        CameraProvider,
        SceneProvider
    ]
})

export  class ThreeBasisModule {}
