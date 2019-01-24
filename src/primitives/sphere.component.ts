import { AfterContentInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Color, Group, Material, Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import { GroupProvider } from '../three-basis/group-provider.service';

import { Object3dComponent } from '../three-basis/object3d.component';

@Component({
    selector: 'three-sphere',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SphereComponent extends Object3dComponent implements AfterContentInit {

    constructor(groupProvider: GroupProvider) {
        super(groupProvider);
    }

    public ngAfterContentInit(): void {
        this.createComponent();
    }

    private createComponent = (): void => {
        const getBodyMaterial = (color: any): Material => new MeshLambertMaterial({ color });

        const group = new Group();

        const material = getBodyMaterial(new Color('orange'));
        const size = 0.5;
        const sphereGeometry = new SphereGeometry(size);
        const element = new Mesh(sphereGeometry, material);
        group.add(element);
        this.Group.add(group);
    }
}
