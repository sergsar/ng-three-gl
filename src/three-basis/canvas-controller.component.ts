import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'three-canvas-controller',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasControllerComponent {

    @Input()
    public set height(value: number) {
        this.canvas.height = value;
    }

    @Input()
    public set width(value: number) {
        this.canvas.width = value;
    }

    get Canvas() : HTMLCanvasElement {
        return this.canvas;
    }

    private readonly canvas: HTMLCanvasElement;

    constructor(elementRef: ElementRef) {
        this.canvas = elementRef.nativeElement.parentElement.getElementsByTagName('canvas')[0];
    }
}
