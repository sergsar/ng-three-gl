import { NgModule } from '@angular/core';

import { AnimateProvider } from './animate-provider.service';
import { CanvasControllerComponent } from './canvas-controller.component';
import { DirectLightComponent } from './direct-light.component';
import { GridHelperComponent } from './grid-helper.component';
import { GroupComponent } from './group.component';
import { HemisphereLightComponent } from './hemisphere-light.component';
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
    ],
    providers: [
        AnimateProvider,
    ],
})

export  class ThreeBasisModule {}
