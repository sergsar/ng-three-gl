import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GroupProvider } from './group-provider.service';
import { Object3dComponent } from './object3d.component';
import { AmbientLight } from 'three';

@Component({
    selector: 'three-ambient-light',
    template: '',
    providers: [GroupProvider],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmbientLightComponent extends Object3dComponent {

    protected light: AmbientLight;

    constructor(groupProvider: GroupProvider) {
        super(groupProvider);

        this.light = new AmbientLight(0x999999, 0.5);

        this.Group.add(this.light);
    }
}
