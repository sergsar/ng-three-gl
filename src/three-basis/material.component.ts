import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CubeTexture, Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, Object3D } from 'three';
import { ElementProviderService } from '../services/element-provider.service';

@Component({
    selector: 'three-material',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent {

    @Input()
    public set materialHolder(object: Object3D) {
        if(object) {
            this.setMaterial(object);
        }
    }

    @Input()
    public set cubeMapUrl(value: string) {
        if(value && value !== '') {
            this.prepareCubeMap(value);
        }
    }

    private readonly material: Material;
    private readonly sources: string = 'assets/textures/cubemaps/skybox';
    private readonly loadedConditions: Array<() => boolean> = [];
    private readonly onload: Array<() => void> = [];



    constructor(private elementProviderService: ElementProviderService) {
        this.material = new MeshLambertMaterial({ color: 'white' });
    }

    private async setMaterial(object: Object3D): Promise<void>  {

        while (!this.loadedConditions.every(p => p())) {
            await  new Promise((resolve, reject) => {
                setTimeout(resolve);
            });
        }
        this.onload.forEach(p => p());
        this.setMaterialRecursive(object);
    }

    private setMaterialRecursive(object: Object3D): void {

        const children = object.children;
        for(const key of Object.keys(children)) {
            const child = children[key];
            const mesh = child as Mesh;
            if(mesh) {
                mesh.material = this.material;
            }
            this.setMaterialRecursive(child);
        }
    }

    private prepareCubeMap(url: string): void {
        const texture = new CubeTexture();

        this.elementProviderService.getImage(`${url}/px.jpg`).then((p) => texture.images[0] = p);
        this.elementProviderService.getImage(`${url}/nx.jpg`).then((p) => texture.images[1] = p);
        this.elementProviderService.getImage(`${url}/py.jpg`).then((p) => texture.images[2] = p);
        this.elementProviderService.getImage(`${url}/ny.jpg`).then((p) => texture.images[3] = p);
        this.elementProviderService.getImage(`${url}/pz.jpg`).then((p) => texture.images[4] = p);
        this.elementProviderService.getImage(`${url}/nz.jpg`).then((p) => texture.images[5] = p);

        this.loadedConditions.push( () => texture.images.filter(p => p !== undefined).length >= 6 );
        this.onload.push(() => {
            texture.needsUpdate = true;
            this.material[('envMap')] = texture;
        });
    }
}
