import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color, Euler, Geometry, LoaderUtils, Material, Matrix4, Mesh, MeshPhongMaterial, MeshPhongMaterialParameters, Object3D, Quaternion, RepeatWrapping, RGBFormat, Texture, Vector3 } from 'three';
import { DataProviderService } from '../../services/data.provider.service';
import { ElementProviderService } from '../../services/element-provider.service';
import { FbxLoaderProvider } from '../../three-basis/fbx-loader.provider';
import { GroupProvider } from '../../three-basis/group-provider.service';
import { RaycastProvider } from '../../three-basis/raycast-provider';

@Component({
    selector: 'three-human-teeth-loader',
    templateUrl: './human-teeth-loader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RaycastProvider, FbxLoaderProvider],
})

export class HumanTeethLoaderComponent implements OnInit {

    @Output()
    public readonly load: EventEmitter<any> = new EventEmitter();

    private object: Object3D;
    private teeth: Geometry[];
    private bounds: Map<string, {}> = new Map();
    private defaultMaterial: Material;
    private selectedMaterial: Material;
    private readonly meshUrl: string = 'assets/mesh/teeth/teeth.fbx';

    constructor(
        private raycastProvider: RaycastProvider,
        private elementProviderService: ElementProviderService,
        private fbxLoaderProvider: FbxLoaderProvider,
        private dataProviderService: DataProviderService,
    ) {
        // this.sceneInputProvider.addEventListener(InputEvent.Click, this.clickHandler);
    }


    public async ngOnInit(): Promise<void> {
        const meshData = await this.dataProviderService.getAwait<ArrayBuffer>(this.meshUrl, { responseType: 'arraybuffer' });

        this.object = await this.fbxLoaderProvider.parse<Object3D>(meshData);
        this.object.updateWorldMatrix(true, true);
        const sides = this.object.children.reduce((s, c) => [...s, ...c.children], []);
        this.teeth = sides.reduce((t, s) => [...t, ...s.children], []);

        this.teeth.forEach(o => {
            const mesh = o as unknown as Mesh;
            const geometry = mesh.geometry;
            geometry.computeBoundingBox();
            const boundingBox = geometry.boundingBox.clone();
            boundingBox.applyMatrix4(mesh.matrixWorld);

            const position = boundingBox.getCenter(new Vector3());
            const size = boundingBox.getSize(new Vector3());

            const positionMap = { x: position.x, y: position.y, z: position.z };
            const sizeMap = { x: size.x, y: size.y, z: size.z };

            this.bounds.set(mesh.name, { position: positionMap, size: sizeMap, mesh: mesh });

            const inverseMatrix = new Matrix4().getInverse(mesh.matrix.clone());
            const boundingBoxInverseMatrix = new Matrix4().getInverse(new Matrix4().compose(position, new Quaternion(), size));


            mesh.applyMatrix(inverseMatrix);
            mesh.applyMatrix(mesh.matrixWorld);
            mesh.applyMatrix(boundingBoxInverseMatrix);
        });


        const textureUrl = 'assets/textures/teeth/Teeth color map.png';
        const normalTextureUrl = 'assets/textures/teeth/Teeth normal map.png';
        const texture = new Texture();
        const normalTexture = new Texture();
        texture.image = await this.elementProviderService.getImage(textureUrl);
        normalTexture.image = await this.elementProviderService.getImage(normalTextureUrl);
        texture.format = RGBFormat;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        normalTexture.format = RGBFormat;
        normalTexture.wrapS = RepeatWrapping;
        normalTexture.wrapT = RepeatWrapping;
        texture.needsUpdate = true;
        normalTexture.needsUpdate = true;

        const defaultMaterialParams: MeshPhongMaterialParameters = {
            map: texture,
            normalMap: normalTexture,
            color: 'white',
            specular: 'white',
            reflectivity: 1.0,
            shininess: 100.0,
        }
        const selectMeterialParams = { ...defaultMaterialParams };
        selectMeterialParams.emissive = new Color(0.1, 0.1, 0.2);
        this.defaultMaterial = new MeshPhongMaterial(defaultMaterialParams);
        this.selectedMaterial = new MeshPhongMaterial(selectMeterialParams);

        this.teeth.forEach(o => (o as unknown as Mesh).material = this.defaultMaterial);

        this.load.emit(this.bounds);
    }

    // public ngOnDestroy(): void {
    //     this.sceneInputProvider.removeEventListener(InputEvent.Click, this.clickHandler);
    // }

    private clickHandler = (): void => {
        console.log('teeth click handler');

        this.teeth.forEach(t => {
            const mesh = t as unknown as Mesh;
            if(!this.defaultMaterial) {
                this.defaultMaterial = mesh.material as Material;
            }
            const intersect = this.raycastProvider.checkIntersection(t as unknown as Object3D);
            mesh.material = intersect ? this.selectedMaterial : this.defaultMaterial;

        })
    }
}
