import { NgModule } from '@angular/core';

import { AmbientLightComponent } from './ambient-light.component';
import { AnimateProvider } from './animate-provider.service';
import { AnimationPlayerComponent } from './animation-player.component';
import { CanvasControllerComponent } from './canvas-controller.component';
import { DirectLightComponent } from './direct-light.component';
import { GenericMeshComponent } from './generic-mesh.component';
import { GridHelperComponent } from './grid-helper.component';
import { GroupComponent } from './group.component';
import { HemisphereLightComponent } from './hemisphere-light.component';
import { MaterialComponent } from './material.component';
import { OrbitControllerComponent } from './orbit-controller.component';
import { PerspectiveCameraComponent } from './perspective-camera.component';
import { RaycasterComponent } from './raycaster.component';
import { RendererComponent } from './renderer.component';
import { SceneComponent } from './scene.component';
import { TransformControllerComponent } from './transform-controller.component';


@NgModule({
    imports: [],
    declarations: [
        CanvasControllerComponent,
        RendererComponent,
        SceneComponent,
        PerspectiveCameraComponent,
        DirectLightComponent,
        HemisphereLightComponent,
        OrbitControllerComponent,
        TransformControllerComponent,
        GroupComponent,
        RaycasterComponent,
        GridHelperComponent,
        GenericMeshComponent,
        AnimationPlayerComponent,
        MaterialComponent,
        AmbientLightComponent,
    ],
    exports: [
        CanvasControllerComponent,
        RendererComponent,
        SceneComponent,
        PerspectiveCameraComponent,
        DirectLightComponent,
        HemisphereLightComponent,
        OrbitControllerComponent,
        TransformControllerComponent,
        GroupComponent,
        RaycasterComponent,
        GridHelperComponent,
        GenericMeshComponent,
        AnimationPlayerComponent,
        MaterialComponent,
        AmbientLightComponent,
    ],
    providers: [
        AnimateProvider,
    ],
})

export  class ThreeBasisModule {}
