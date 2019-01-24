import {ElementRef} from '@angular/core';
import {CanvasProvider} from './canvas-provider.service';

export const canvasProviderFactory = (elementRef: ElementRef) : CanvasProvider =>
    new CanvasProvider(elementRef.nativeElement.parentElement);
