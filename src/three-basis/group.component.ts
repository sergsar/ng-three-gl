import { ChangeDetectionStrategy, Component, InjectFlags, Injector, SkipSelf } from '@angular/core';

import { groupProviderFactory } from './group-provider.factory';
import { GroupProvider } from './group-provider.service';
import { Object3dComponent } from './object3d.component';

@Component({
    selector: 'three-group',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: GroupProvider, useFactory: groupProviderFactory }],
})
export class GroupComponent extends Object3dComponent {

    constructor(@SkipSelf() groupProvider: GroupProvider, injector: Injector) {
        const selfGroupProvider = injector.get(GroupProvider);
        super(selfGroupProvider);
        groupProvider.Group.add(selfGroupProvider.Group);
    }


}
