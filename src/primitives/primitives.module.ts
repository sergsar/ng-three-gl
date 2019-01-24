import { NgModule } from '@angular/core';
import { CubeComponent } from './cube.component';
import { SphereComponent } from './sphere.component';

@NgModule({
   imports: [],
   declarations: [
       CubeComponent,
       SphereComponent,
   ],
   exports: [
       CubeComponent,
       SphereComponent,
   ],
   providers: [],
})
export class PrimitivesModule {}
