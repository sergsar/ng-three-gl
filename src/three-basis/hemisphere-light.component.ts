import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HemisphereLight} from 'three';
import { GroupProvider } from './group-provider.service';
import { Object3dComponent } from './object3d.component';

@Component({
  selector: 'three-hemisphere-light',
  template: '',
  providers: [GroupProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HemisphereLightComponent extends Object3dComponent {


  constructor(groupProvider: GroupProvider) {
    super(groupProvider);

    const hemisphereLight = new HemisphereLight(0x222222, 0x111111);

    this.Group.add(hemisphereLight);
  }
}
