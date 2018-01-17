import {Component, forwardRef, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {Object3dComponent} from '../../three-basis/object3d.component';
import {CubeFirstElement} from './cube-first-element';
import {
    BoxGeometry, Color, Group, MeshLambertMaterial, Mesh, Object3D, Vector3, Material, Font, BufferGeometry,
    ShapeGeometry, MeshBasicMaterial, Texture, RGBFormat
} from 'three';
import {CubeSerialElement} from './cube-serial-element';
import {BindObjectComponent} from '../../components-elementary/bind-object.component';
import {DataProviderService} from '../../data.provider.service';
import {Anchor} from '../../three-basis/anchor';
import {anchorToVector2} from '../../three-basis/anchor-to-vector2';
import {ElementProviderService} from '../../three-basis/element-provider.service';
import {BindItemComponent} from '../../components-elementary/bind-item.component';

@Component({
    selector: 'cube-control',
    template: '<ng-content></ng-content>',
    providers: [{ provide: Object3dComponent, useExisting: forwardRef(() => CubeControlComponent) }]
})
export class CubeControlComponent extends Object3dComponent implements AfterContentInit {

    private dataProviderService: DataProviderService;
    private elementProviderService: ElementProviderService;

    @ContentChildren(BindObjectComponent)
    private objects: QueryList<BindObjectComponent> = new QueryList<BindObjectComponent>();

    @ContentChildren(BindItemComponent)
    private items: QueryList<BindItemComponent> = new QueryList<BindItemComponent>();

    constructor(dataProviderService: DataProviderService, elementProviderService: ElementProviderService) {
        super();
        this.dataProviderService = dataProviderService;
        this.elementProviderService = elementProviderService;
    }

    ngAfterContentInit() {
        this.object3d = new Group();
        this.createComponent();
    }

    private async createComponent() {
        const fontUrl = 'assets/fonts/helvetiker_regular.typeface.json';
        const fontData = await this.dataProviderService.getAwait<string>(fontUrl);
        const textureUrl = 'assets/textures/UV_Grid_Sm.jpg';
        const texture = new Texture();
        texture.image = await this.elementProviderService.getImage(textureUrl);
        texture.format = RGBFormat;
        texture.needsUpdate = true;

        const group = this.object3d;

        function getBodyMaterial(color: any): Material { return new MeshLambertMaterial({color: color, map: texture}); }
        const partsHeight = 0.1;
        const cubePartsRoot = this.objects.filter(p => p.name === 'CubeParts')[0];
        const cubeParts = cubePartsRoot.getObjects().filter(p => p.name === 'CubePart').sort(p => -Number(p.getItems().filter(p1 => p1.key === 'Value')[0].value));
        const ratesMaxValue = Number(cubeParts[cubeParts.length - 1].getItems().filter(p => p.key === 'Value')[0].value);
        for (let i = 0; i < cubeParts.length; i++) {
            const cubePart = cubeParts[i];
            const color = new Color(cubePart.getItems().filter(p => p.key === 'Color')[0].value);
            let element: Object3D;
            if (i === 0) {
                const value = Math.sqrt(Number(cubePart.getItems().filter(p => p.key === 'Value')[0].value) / ratesMaxValue);
                element = new CubeFirstElement(value, partsHeight, getBodyMaterial(color)).getElement();
            } else {
                const previousCubePart = cubeParts[i - 1];
                const value = Math.sqrt(Number(previousCubePart.getItems().filter(p => p.key === 'Value')[0].value) / ratesMaxValue);
                const value2 = Math.sqrt(Number(cubePart.getItems().filter(p => p.key === 'Value')[0].value) / ratesMaxValue);
                element = new CubeSerialElement(value, value2, partsHeight, getBodyMaterial(color)).getElement();
            }
            group.add(element);
        }

        const ratesThickness = 0.08;
        const cubeRatesRoot = this.objects.filter(p => p.name === 'CubeRates')[0];
        const cubeRates = cubeRatesRoot.getObjects().filter(p => p.name === 'CubeRate');
        const ratesSum = cubeRates.map(function (p) { return Number(p.getItems().filter(p1 => p1.key === 'Value')[0].value); }).reduce(function (p, p1) { return p + p1; }, 0);
        let widths = 0;
        cubeRates.forEach(rate => {
            const value = Number(rate.getItems().filter(p => p.key === 'Value')[0].value);
            const width = value / ratesSum;
            const color = rate.getItems().filter(p => p.key === 'Color')[0].value;
            const element = new Mesh(new BoxGeometry(width, ratesThickness, ratesThickness), getBodyMaterial(color));
            element.translateOnAxis(new Vector3((width - 1) * 0.5 + widths, partsHeight + ratesThickness * 0.5, (ratesThickness - 1) * 0.5), 1);
            widths = widths + width;
            group.add(element);
        });

        const ratesTitle = cubeRatesRoot.getItems().filter(p => p.key === 'Title')[0].value;
        const leftRateValue = cubeRates[0].getItems().filter(p => p.key === 'Value')[0].value;
        const rightRateValue = cubeRates[cubeRates.length - 1].getItems().filter(p => p.key === 'Value')[0].value;
        const textsMaterial = new MeshBasicMaterial({color: 'white'});
        const ratesTitleSize = 0.04;
        const ratesValueSize = 0.05;
        const rateValuesGroup = new Group();
        const ratesTitleGeometry = this.getTextGeometry(ratesTitle, fontData, ratesTitleSize, Anchor.LowerCenter);
        const ratesTitleElement = new Mesh(ratesTitleGeometry, textsMaterial);
        ratesTitleElement.translateY(partsHeight + ratesThickness + ratesTitleSize * 0.5);
        rateValuesGroup.add(ratesTitleElement);
        const leftRateValueGeometry = this.getTextGeometry(leftRateValue, fontData, ratesValueSize, Anchor.LowerLeft);
        const leftRateValueElement = new Mesh(leftRateValueGeometry, textsMaterial);
        const rightRateValueGeometry = this.getTextGeometry(rightRateValue, fontData, ratesValueSize, Anchor.LowerRight);
        const rightRateValueElement = new Mesh(rightRateValueGeometry, textsMaterial);
        leftRateValueElement.translateOnAxis(new Vector3(-0.45, partsHeight + ratesThickness + ratesValueSize * 0.2, 0), 1);
        rightRateValueElement.translateOnAxis(new Vector3(0.45, partsHeight + ratesThickness + ratesValueSize * 0.2, 0), 1);
        rateValuesGroup.add(rightRateValueElement);
        rateValuesGroup.add(leftRateValueElement);
        rateValuesGroup.translateZ(-0.5);
        group.add(rateValuesGroup);
    }

    private getTextGeometry(text: string, fontData: string, size: number, anchor: Anchor = Anchor.MiddleCenter): BufferGeometry {
        const font = new Font(fontData);
        const shapes = font.generateShapes(text, size, 1);
        const shapeGeometry = new ShapeGeometry(shapes);
        shapeGeometry.computeBoundingBox();
        const vector2 = anchorToVector2(anchor);
        const xMid = -0.5 * (vector2.x + 1) * (shapeGeometry.boundingBox.max.x - shapeGeometry.boundingBox.min.x);
        const yMid = -0.5 * (vector2.y + 1) * (shapeGeometry.boundingBox.max.y - shapeGeometry.boundingBox.min.y);
        shapeGeometry.translate(xMid, yMid, 0);
        const bufferGeometry = new BufferGeometry();
        bufferGeometry.fromGeometry(shapeGeometry);
        return bufferGeometry;
    }
}
