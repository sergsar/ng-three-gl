import { NgModule } from '@angular/core';
import { ThreeBasisModule } from '../three-basis/three-basis.module';
import { CubeComponent } from './cube/cube.component';
import { HumanTeethLoaderComponent } from './human-teeth-loader/human-teeth-loader.component';
import { MapViewComponent } from './map-view/map-view.component';
import { VisualContainerComponent } from './visual-container/visual-container.component';

@NgModule({
    imports: [ThreeBasisModule],
    declarations: [
        CubeComponent,
        VisualContainerComponent,
        HumanTeethLoaderComponent,
        MapViewComponent
    ],
    exports: [
        CubeComponent,
        VisualContainerComponent,
        HumanTeethLoaderComponent,
        MapViewComponent
    ],
    providers: [],
})
export class ThreeComponentsModule {

}
