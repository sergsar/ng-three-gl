import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { Geometry, LoaderUtils, Mesh, Object3D } from 'three';
import { DataProviderService } from '../services/data.provider.service';
import { FbxLoaderProvider } from './fbx-loader.provider';
import { GroupProvider } from './group-provider.service';
import { Object3dComponent } from './object3d.component';

declare var require: any;
const THREE = require('three');
const FBXLoader = require('../assets/js/three/loaders/FBXLoader');

@Component({
    selector: 'three-generic-mesh',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GroupProvider, FbxLoaderProvider],
})
export class GenericMeshComponent extends Object3dComponent {

    @Output()
    public readonly updateData: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly updateGeometry: EventEmitter<any> = new EventEmitter();

    @Input()
    public set data(value: string) {
        if(!value) {
            return;
        }
        const decoded = atob(value);
        if(!decoded || decoded === '' || this.meshData === decoded) {
            return;
        }
        this.meshData = decoded;
        this.updateComponent();
    }

    @Input()
    public set meshUrl(value: string) {
        if(!value || value === '' || this.meshUrl === value) {
            return;
        }
        this.meshData = undefined;
        this.loaderDataUrl = value;
        this.updateComponent();
    }

    public get geometry() : Geometry {
        return this.loadedObject;
    }

    @Input()
    public set geometry(geometry: Geometry) {
        if(!geometry) {
            return;
        }
        this.loadedObject = geometry;
        this.onUpdateGeometry();
    }

    private loaderDataUrl;
    private loadedObject: Geometry;
    private meshData: string;

    constructor(
        groupProvider: GroupProvider,
        private dataProviderService: DataProviderService,
        private fbxLoaderProvider: FbxLoaderProvider,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        super(groupProvider);
    }

    public setCastShadow(value: boolean): void {
        super.setCastShadow(value);
        if(this.loadedObject) {
            this.setMeshValue(this.loadedObject as unknown as Object3D, (mesh) => mesh.castShadow = value);
        }
    }

    public setReceiveShadow(value: boolean): void {
        super.setReceiveShadow(value);
        if(this.loadedObject) {
            this.setMeshValue(this.loadedObject as unknown as Object3D, (mesh) => mesh.receiveShadow = value);
        }
    }

    private onDataLoaded() : void {

        if(this.loadedObject) {
            this.Group.remove(this.loadedObject as any as Object3D);
        }

        this.loadedObject = this.fbxLoaderProvider.parse<Geometry>(this.meshData);

        this.onUpdateGeometry();
    }

    private onUpdateGeometry(): void {
        this.updateGeometry.emit(this.loadedObject);

        this.CastShadow = this.castShadow;
        this.ReceiveShadow = this.receiveShadow;

        this.Group.children.forEach(p => this.Group.remove(p));
        this.Group.add(this.loadedObject as any as Object3D);

        this.changeDetectorRef.markForCheck();
    }

    private async updateComponent(): Promise<void> {
        if(!this.meshData || this.meshData === '') {
            const data = await this.dataProviderService.getAwait<unknown>(this.loaderDataUrl, { responseType: 'arraybuffer' });
            if(!this.fbxLoaderProvider.isBinnaryFormat(data)){
                const buffer = data as ArrayBuffer;
                this.meshData = LoaderUtils.decodeText(new Uint8Array(buffer, 0, buffer.byteLength));
                this.updateData.emit(btoa(this.meshData));
            } else {
                this.meshData = data as string;
            }
        }

        this.onDataLoaded();
    }


    private setMeshValue = (object: Object3D, predicat: (mesh: Mesh) => void): void => {

        const children = object.children;
        for(const key of Object.keys(children)) {
            const child = children[key];
            const mesh = child as Mesh;
            if(mesh) {
                predicat(mesh);
            }
            this.setMeshValue(child, predicat);
        }
    }
}
