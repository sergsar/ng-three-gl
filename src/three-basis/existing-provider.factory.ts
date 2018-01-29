import {ExistingProvider, forwardRef, Type} from '@angular/core';
import {Object3dComponent} from './object3d.component';

export function existingProviderFactory(type: Type<Object3dComponent>) {
  console.log(typeof type);
  return { provide: Object3dComponent, useExisting: forwardRef(() => type) } as ExistingProvider;
}
