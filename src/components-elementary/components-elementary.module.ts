import {NgModule} from '@angular/core';
import {Group3dComponent} from '../three-basis/group3d.component';
import {BindObjectComponent} from "./bind-object.component";
import {BindItemComponent} from "./bind-item.component";

@NgModule({
    declarations: [BindObjectComponent, BindItemComponent],
    exports: [BindObjectComponent, BindItemComponent]
})
export class ComponentsElementaryModule { }
