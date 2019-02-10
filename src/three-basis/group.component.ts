import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { GroupProvider } from './group-provider.service';
import { Object3dComponent } from './object3d.component';

@Component({
    selector: 'three-group',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GroupProvider],
})
export class GroupComponent extends Object3dComponent {


    constructor(groupProvider: GroupProvider) {
        super(groupProvider);
    }
}
