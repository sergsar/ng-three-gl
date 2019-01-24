import { NgModule } from '@angular/core';

import { AnimateProvider } from './animate-provider.service';
import { CameraProvider } from './camera-provider.service';
import { DirectLightComponent } from './direct-light.component';
import { GroupProvider } from './group-provider.service';
import { GroupComponent } from './group.component';
import { HemisphereLightComponent } from './hemisphere-light.component';
import { OrbitControllerComponent } from './orbit-controller.component';
import { PerspectiveCameraComponent } from './perspective-camera.component';
import { RendererProvider } from './renderer-provider.service';
import { RendererComponent } from './renderer.component';
import { SceneComponent } from './scene.component';
import { ThreeAreaComponent } from './three-area.component';


@NgModule({
    imports: [],
    declarations: [
        ThreeAreaComponent,
        RendererComponent,
        SceneComponent,
        PerspectiveCameraComponent,
        DirectLightComponent,
        HemisphereLightComponent,
        OrbitControllerComponent,
        GroupComponent,
    ],
    exports: [
        ThreeAreaComponent,
        RendererComponent,
        SceneComponent,
        PerspectiveCameraComponent,
        DirectLightComponent,
        HemisphereLightComponent,
        OrbitControllerComponent,
        GroupComponent,
    ],
    providers: [
        AnimateProvider,
        RendererProvider,
        CameraProvider,
    ],
})

export  class ThreeBasisModule {}
