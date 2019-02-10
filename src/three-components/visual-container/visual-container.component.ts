import { AfterContentInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BoxGeometry, Group, Mesh, MeshLambertMaterial } from 'three';
import { GroupProvider } from '../../three-basis/group-provider.service';
import { Object3dComponent } from '../../three-basis/object3d.component';


@Component({
    selector: 'three-visual-container',
    template: '<ng-content></ng-content>',
    providers: [GroupProvider],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualContainerComponent extends Object3dComponent implements AfterContentInit {

    @Input()
    public set selected(value: boolean) {
        if (this.mesh) {
            this.mesh.visible = value;
        }
    }

    @Input()
    public set visible(value: boolean) {
        if (this.wireMesh) {
            this.wireMesh.visible = value;
        }
    }

    public get Mesh(): Mesh {
        return this.wireMesh;
    }

    private mesh: Mesh;
    private wireMesh: Mesh;

    constructor(groupProvider: GroupProvider) {
        super(groupProvider);
    }

    public ngAfterContentInit(): void {
        this.createComponent();
    }

    private createComponent = (): void => {
        const wireMaterial = new MeshLambertMaterial({ wireframe: true, color: 'white' });
        const material = new MeshLambertMaterial({ color: 'green', transparent: true, opacity: 0.5 })

        const group = new Group();

        const size = 1.0;
        const boxGeometry = new BoxGeometry(size, size, size);
        this.mesh = new Mesh(boxGeometry, material);
        this.mesh.visible = false;
        this.wireMesh = new Mesh(boxGeometry, wireMaterial);
        group.add(this.mesh);
        group.add(this.wireMesh);
        this.Group.add(group);
    }


}
