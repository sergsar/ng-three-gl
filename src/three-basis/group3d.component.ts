import {Component, QueryList, ContentChildren, AfterContentInit} from '@angular/core';
import {Group} from 'three';
import {Object3dComponent} from './object3d.component';
import {object3dProviderFactory} from './object3d-provider.factory';

@Component({
    selector: 'group-3d',
    template: '<ng-content></ng-content>',
    providers: [object3dProviderFactory(Group3dComponent)]
})
export class Group3dComponent extends Object3dComponent implements AfterContentInit {
    constructor() {
        super();
        this.object3d = new Group();
    }

  @ContentChildren(Object3dComponent)
  private objects3D: QueryList<Object3dComponent> = new QueryList<Object3dComponent>();

  ngAfterContentInit() {
    this.objects3D.filter(p => p !== this).forEach(p => this.object3d.add(p.getObject3D()));
  }
}
