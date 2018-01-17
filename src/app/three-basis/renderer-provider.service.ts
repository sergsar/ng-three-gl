import {Injectable} from '@angular/core';
import {WebGLRenderer, WebGLRendererParameters} from 'three';

@Injectable()
export  class RendererProvider {
    private renderers: Map<string, WebGLRenderer> = new Map();
    private parameters: Map<string, WebGLRendererParameters> = new Map();

    public getRenderer(parameters?: WebGLRendererParameters, id?: string): WebGLRenderer {
        let renderer = this.renderers.get(id);
        if (parameters === null) {
          parameters = this.parameters.get(id);
        } else {
          this.parameters.set(id, parameters);
        }
        if (parameters === null) {
          throw new Error('null parameters');
        }
        if (renderer == null) {
            renderer = new WebGLRenderer(parameters);
            this.renderers.set(id, renderer);
        }
        return renderer;
    }
}
