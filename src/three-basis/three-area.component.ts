import {Component, ElementRef, Input} from '@angular/core';
import {CanvasProvider} from './canvas-provider.service';
import {canvasProviderFactory} from './canvas-provider-factory';


@Component({
  selector: 'three-area',
  template: `<ng-content></ng-content>`,
  providers: [{ provide: CanvasProvider, deps: [ElementRef], useFactory: canvasProviderFactory }]
})
export class ThreeAreaComponent {

  @Input()
  private height = 98;

  @Input()
  private width = 98;

  private canvas: any;

  constructor(canvasProvider: CanvasProvider) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.canvas = canvasProvider.getCanvas();
    this.canvas.width = screenWidth * this.width / 100;
    this.canvas.height = screenHeight * this.height / 100;

    window.addEventListener( 'resize', () => this.onWindowResize() , false );
  }

  private onWindowResize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.canvas.width = screenWidth * this.width / 100;
    this.canvas.height = screenHeight * this.height / 100;
  }

}
