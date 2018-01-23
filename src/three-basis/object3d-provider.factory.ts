import {ExistingProvider, forwardRef, Type} from '@angular/core';
import {Object3dComponent} from './object3d.component';

export function object3dProviderFactory(type: Type<Object3dComponent>) {
  return { provide: Object3dComponent, useExisting: forwardRef(() => type) } as ExistingProvider;
}
