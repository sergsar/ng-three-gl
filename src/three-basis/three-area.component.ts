import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import {canvasProviderFactory} from './canvas-provider.factory';
import {CanvasProvider} from './canvas-provider.service';


@Component({
  selector: 'three-area',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CanvasProvider, deps: [ElementRef], useFactory: canvasProviderFactory }]
})
export class ThreeAreaComponent implements OnChanges {

    @Input()
    private height = 100;

    @Input()
    private width = 100;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvasProvider: CanvasProvider) {
        this.canvas = canvasProvider.getCanvas();
        this.context = canvasProvider.getContext();

    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}
