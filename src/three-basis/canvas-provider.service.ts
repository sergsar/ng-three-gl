import {ElementRef, Inject, Injectable} from '@angular/core';

@Injectable()
export class CanvasProvider {
  private readonly canvas: HTMLCanvasElement;

  constructor(@Inject(ElementRef) canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext() : CanvasRenderingContext2D {
      return this.canvas.getContext('2d') as CanvasRenderingContext2D
  }
}
