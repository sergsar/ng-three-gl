import {Inject, Injectable} from '@angular/core';

@Injectable()
export class CanvasProvider {
  private canvas: HTMLCanvasElement;

  constructor(@Inject(HTMLCanvasElement) canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}
