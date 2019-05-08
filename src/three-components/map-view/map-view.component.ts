import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GroupProvider } from '../../three-basis/group-provider.service';
import { Object3dComponent } from '../../three-basis/object3d.component';

@Component({
    selector: 'three-map-view',
    template: '<ng-content></ng-content>',
    providers: [GroupProvider],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent extends Object3dComponent {
    constructor(groupProvider: GroupProvider) {
        super(groupProvider);
    }


}
