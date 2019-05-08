import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BufferGeometry, DirectionalLight, DirectionalLightHelper, Float32BufferAttribute, Group, Line, LineBasicMaterial, Object3D } from 'three';
import { GroupProvider } from './group-provider.service';
import { Object3dComponent } from './object3d.component';

@Component({
    selector: 'three-direct-light',
    template: '',
    providers: [GroupProvider],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectLightComponent extends Object3dComponent implements OnInit {

    @Input()
    public set Helper(visible: boolean) {
        this.lightHelper.visible = visible;
    }

    @Input()
    public set Intensity(intensity: number) {
        if(this.light) {
            this.light.intensity = intensity;
        }
        this.intensity = intensity;
    }

    protected light: DirectionalLight;

    private lightHelper: Object3D = new Group();
    private intensity: number;

    constructor(groupProvider: GroupProvider) {
        super(groupProvider);
    }

    public ngOnInit(): void {
        this.light = new DirectionalLight(0xFFFFFF,  this.intensity);
        const directionalLight = this.light;

        directionalLight.castShadow = this.castShadow;
        directionalLight.shadow.bias = - 0.0001;
        directionalLight.shadow.radius = 1;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 100;
        directionalLight.shadow.camera.right = 1;
        directionalLight.shadow.camera.left = -1;
        directionalLight.shadow.camera.top = 1;
        directionalLight.shadow.camera.bottom = -1;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;

        this.Group.add(directionalLight);

        // light helper
        const helperSize = 0.25;
        const lineMaterial = new LineBasicMaterial( { fog: false });
        const planeGeometry = new BufferGeometry();

        planeGeometry.addAttribute( 'position', new Float32BufferAttribute( ([
            -1, 0, 1,
            1, 0, 1,
            1, 0, -1,
            -1, 0, -1,
            -1, 0, 1
        ]).map(p => p * 0.5), 3 ) );
        const helperPlane = new Line(planeGeometry, lineMaterial);
        const lineGeometry = new BufferGeometry();
        lineGeometry.addAttribute( 'position', new Float32BufferAttribute( [ 0, 0, 0, 0, -1, 0 ], 3 ) );
        const helperLine = new Line(lineGeometry, lineMaterial);
        this.lightHelper.add(helperPlane);
        this.lightHelper.add(helperLine);
        this.Group.add(this.lightHelper);
        this.lightHelper.position.set(0.0, 0.5, 0.0);
    }

    protected setCastShadow(value: boolean): void {
        super.setCastShadow(value);
        if(this.light) {
            this.light.castShadow = value;
        }
    }
}
