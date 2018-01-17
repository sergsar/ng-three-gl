import {NgModule} from '@angular/core';
import {CubeControlModule} from './cube-control/cube-control.module';
import {CubeControlComponent} from './cube-control/cube-control.component';

@NgModule({
    imports: [CubeControlModule],
    exports: [CubeControlComponent]
})

export class ComponentsModule {}
