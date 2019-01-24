import { AfterContentInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxGeometry, Color, Group, Material, Mesh, MeshLambertMaterial } from 'three';
import { GroupProvider } from '../three-basis/group-provider.service';

import { Object3dComponent } from '../three-basis/object3d.component';


@Component({
    selector: 'three-cube',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent extends Object3dComponent implements AfterContentInit {

    constructor(groupProvider: GroupProvider) {
        super(groupProvider);
    }

    public ngAfterContentInit(): void {
        this.createComponent();
    }

    private createComponent = (): void => {


        const getBodyMaterial = (color: any): Material => new MeshLambertMaterial({ color, wireframe: true });

        const group = new Group();

        const material = getBodyMaterial(new Color('orange'));
        const size = 1.0;
        const boxGeometry = new BoxGeometry(size, size, size);
        const element = new Mesh(boxGeometry, material);
        group.add(element);
        this.Group.add(group);
    }


}
