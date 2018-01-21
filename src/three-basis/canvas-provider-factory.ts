import {ElementRef} from '@angular/core';
import {CanvasProvider} from './canvas-provider.service';

export function canvasProviderFactory(elementRef: ElementRef) {
  return new CanvasProvider(elementRef.nativeElement.parentElement);
}
