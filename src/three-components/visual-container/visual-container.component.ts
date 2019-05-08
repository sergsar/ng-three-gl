import { AfterContentInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BoxGeometry, BoxHelper, Color, Group, Mesh, MeshLambertMaterial } from 'three';
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
    public set highlighted(value: boolean) {
        if(this.highlightMesh) {
            this.highlightMesh.visible = value;
        }
    }

    @Input()
    public set HighlightColor(color: string) {
        this.highlightColor = color;
        if(this.highlightMaterial) {
            this.highlightMaterial.color = new Color(color);
        }
    }

    @Input()
    public set Visible(value: boolean) {
        this.visible = value;
        if(this.boxHelper) {
            this.boxHelper.visible = value;
        }
    }

    public get Mesh(): Mesh {
        return this.raycastMesh;
    }

    private highlightMesh: Mesh;
    private raycastMesh: Mesh;
    private boxHelper: BoxHelper;
    private visible: boolean;
    private highlightMaterial: MeshLambertMaterial;
    private highlightColor: string = 'green';

    constructor(groupProvider: GroupProvider) {
        super(groupProvider);
    }

    public ngAfterContentInit(): void {
        this.createComponent();
    }

    private createComponent = (): void => {
        const wireMaterial = new MeshLambertMaterial({ wireframe: true, color: 'white' });
        this.highlightMaterial = new MeshLambertMaterial({ color: this.highlightColor, transparent: true, opacity: 0.5 })

        const group = new Group();

        const size = 1.0;
        const boxGeometry = new BoxGeometry(size, size, size);
        this.highlightMesh = new Mesh(boxGeometry, this.highlightMaterial);
        this.highlightMesh.visible = false;
        this.raycastMesh = new Mesh(boxGeometry);
        this.raycastMesh.material[('visible')] = false;
        this.boxHelper = new BoxHelper(this.highlightMesh);
        this.boxHelper.visible = this.visible;
        group.add(this.highlightMesh);
        group.add(this.raycastMesh);
        group.add(this.boxHelper);
        this.Group.add(group);
    }


}
