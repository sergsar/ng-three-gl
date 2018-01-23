import {Component} from '@angular/core';
import {HemisphereLight} from 'three';
import {Object3dComponent} from './object3d.component';
import {object3dProviderFactory} from './object3d-provider.factory';

@Component({
  selector: 'hemisphere-light',
  template: '',
  providers: [object3dProviderFactory(HemisphereLightComponent)]
})
export class HemisphereLightComponent extends Object3dComponent {
  private hemisphereLight: HemisphereLight;

  constructor() {
    super();

    this.hemisphereLight = new HemisphereLight(0x808080, 0x404040);

    this.object3d = this.hemisphereLight;
  }
}
