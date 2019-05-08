import { Injectable } from '@angular/core';
import { Object3D, RGBAFormat, RGBFormat, Texture } from 'three';
import { DataProviderService } from '../services/data.provider.service';
import { ElementProviderService } from '../services/element-provider.service';

declare var require: any;
const THREE = require('three');
const FBXLoader = require('../assets/js/three/loaders/FBXLoader');

@Injectable()
export class FbxLoaderProvider {

    private readonly loader = new FBXLoader.FBXLoader();
    private readonly texturesDir: string = 'assets/textures/';

    constructor(
        private elementProviderService: ElementProviderService
    ) {}

    public parse<T>(data: any): T;

    public parse(data: any): Object3D {
        // console.log(data.replace(new RegExp('\n', 'g'), '').replace(new RegExp('^|\\s(\\w+):', 'g'), ' "$1":'));
        let fbxTree;
        if (this.loader.isFbxFormatBinary(data)) {
            fbxTree = new FBXLoader.BinaryParser().parse(data);
        } else {
            if (!this.loader.isFbxFormatASCII(data)) {

                throw new Error('THREE.FBXLoader: Unknown format.');

            }
            const fbxVersion = this.loader.getFbxVersion(data);

            if (fbxVersion < 7000) {

                throw new Error(`THREE.FBXLoader: FBX version not supported, FileVersion: ${fbxVersion}`);

            }
            fbxTree = new FBXLoader.TextParser().parse(data);
        }

        const fbxTreeParser = new FBXLoader.FBXTreeParser();

        const connections = fbxTreeParser.parseConnections();

        const images = fbxTreeParser.parseImages();
        const textures = this.parseTextures(fbxTree, connections, images);
        const materials = fbxTreeParser.parseMaterials(textures);
        const deformers = fbxTreeParser.parseDeformers();

        const geometryParser = new FBXLoader.GeometryParser();
        const geometryMap = geometryParser.parse(deformers);

        const sceneGraph = fbxTreeParser.parseScene(deformers, geometryMap, materials);

        return sceneGraph;

    }

    public isBinnaryFormat(data: unknown): boolean {
        return this.loader.isFbxFormatBinary(data);
    }

    private parseTextures(fbxTree: any, connections: any, images: any): Map<any, any> {
        const textureMap = new Map();
        if ( 'Texture' in fbxTree.Objects ) {

            const textureNodes = fbxTree.Objects.Texture;
            for ( const nodeID of Object.keys(textureNodes)) {

                const textureNode = textureNodes[nodeID];
                const children = connections.get( textureNode.id ).children;
                let fileName;
                if(children && children.length && children.length > 0 && images[children[0].ID]) {
                    fileName = images[children[0].ID];

                }
                const texture = this.loadTexture(fileName);
                textureMap.set( Number(nodeID), texture );

            }

        }
        return textureMap;
    }

    private loadTexture(fileName: string): Texture {
        const texture = new Texture();
        const extension = fileName.slice( - 3 ).toLowerCase();

        const textureUrl = this.texturesDir + fileName;
        // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
        const isJPEG = textureUrl.search( /\.jpe?g($|\?)/i ) > 0 || textureUrl.search( /^data\:image\/jpeg/ ) === 0;
        texture.format = isJPEG ? RGBFormat : RGBAFormat;
        this.elementProviderService.getImage(textureUrl).then((o) => {
            texture.image = o;
            texture.needsUpdate = true;
        });
        return texture;
    }
}
