import {Component, forwardRef} from '@angular/core';
import {HemisphereLight} from 'three';
import {Object3dComponent} from './object3d.component';

@Component({
  selector: 'hemisphere-light',
  template: '',
  providers: [{ provide: Object3dComponent, useExisting: forwardRef(() => HemisphereLightComponent) }]})
export class HemisphereLightComponent extends Object3dComponent {
  private hemisphereLight: HemisphereLight;

  constructor() {
    super();

    this.hemisphereLight = new HemisphereLight(0x606090, 0x404040);

    this.object3d = this.hemisphereLight;
  }
}
