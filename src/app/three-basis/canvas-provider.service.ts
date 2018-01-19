import {Inject, Injectable} from '@angular/core';

@Injectable()
export class CanvasProvider {
  private canvas: any;

  constructor(@Inject(Object) canvas: any) {
    this.canvas = canvas;
  }

  public getCanvas(): any {
    return this.canvas;
  }
}
