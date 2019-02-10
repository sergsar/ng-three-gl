import { NgModule } from '@angular/core';
import { CubeComponent } from './cube/cube.component';
import { VisualContainerComponent } from './visual-container/visual-container.component';

@NgModule({
    imports: [],
    declarations: [CubeComponent, VisualContainerComponent],
    exports: [CubeComponent, VisualContainerComponent],
    providers: [],
})
export class ThreeComponentsModule {

}
