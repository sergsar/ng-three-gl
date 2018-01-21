import {Injectable} from '@angular/core';
import {WebGLRenderer, WebGLRendererParameters} from 'three';

@Injectable()
export  class RendererProvider {
    private renderers: Map<string, WebGLRenderer> = new Map();

    public setRenderer(renderer: WebGLRenderer, id?: string): WebGLRenderer {
        this.renderers.set(id, renderer);
        return renderer;
    }

    public getRenderer(id?: string): WebGLRenderer {
      return this.renderers.get(id);
    }
}
