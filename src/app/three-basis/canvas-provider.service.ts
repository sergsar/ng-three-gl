import {ElementRef, Inject, Injectable} from '@angular/core';

@Injectable()
export class CanvasProvider {
  private canvas: HTMLCanvasElement;

  constructor(@Inject(ElementRef) canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}
