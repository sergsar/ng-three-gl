import {NgModule} from '@angular/core';
import {Group3dComponent} from './group3d.component';
import {BindObjectComponent} from "./bind-object.component";
import {BindItemComponent} from "./bind-item.component";

@NgModule({
    declarations: [Group3dComponent, BindObjectComponent, BindItemComponent],
    exports: [Group3dComponent, BindObjectComponent, BindItemComponent]
})
export class ComponentsElementaryModule { }
