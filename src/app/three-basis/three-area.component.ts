import { Component, ContentChildren, QueryList } from '@angular/core';
import {RendererComponent} from './renderer.component';

@Component({selector: 'three-area', template: `<ng-content></ng-content>`})
export class ThreeAreaComponent {

    @ContentChildren(RendererComponent)
    RendererComponents: QueryList<RendererComponent> = new QueryList<RendererComponent>();
}
