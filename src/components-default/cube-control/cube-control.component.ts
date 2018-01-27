import {Component, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {Object3dComponent} from '../../three-basis/object3d.component';
import {CubeFirstElement} from './cube-first-element';
import {
  BoxGeometry, Color, Group, MeshLambertMaterial, Mesh, Object3D, Vector3, Material, Font, BufferGeometry,
  ShapeGeometry, MeshBasicMaterial, Texture, RGBFormat, RepeatWrapping, PlaneGeometry
} from 'three';
import {CubeSerialElement} from './cube-serial-element';
import {BindObjectComponent} from '../../components-elementary/bind-object.component';
import {DataProviderService} from '../../app/data.provider.service';
import {Anchor} from '../../three-basis/anchor';
import {anchorToVector2} from '../../three-basis/anchor-to-vector2';
import {ElementProviderService} from '../../three-basis/element-provider.service';
import {BindItemComponent} from '../../components-elementary/bind-item.component';
import {UvMapProjector} from '../../three-basis/uv-map-projector';
import {object3dProviderFactory} from '../../three-basis/object3d-provider.factory';

@Component({
    selector: 'cube-control',
    template: '<ng-content></ng-content>',
    providers: [object3dProviderFactory(CubeControlComponent)]
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
        const textsMaterial = new MeshBasicMaterial({color: 'white'});
        const textureUrl = 'assets/textures/KUB.JPG';
        const texture = new Texture();
        texture.image = await this.elementProviderService.getImage(textureUrl);
        texture.format = RGBFormat;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.needsUpdate = true;

        const uvMapProjector = new UvMapProjector();

        const group = this.object3d;

        function getBodyMaterial(color: any): Material { return new MeshLambertMaterial({color: color, map: texture}); }
        const partsHeight = 0.1;
        const cubePartsRoot = this.objects.filter(p => p.name === 'CubeParts')[0];
        const cubeParts = cubePartsRoot.getObjects().filter(p => p.name === 'CubePart').sort(p => -Number(p.getItems().filter(p1 => p1.key === 'Value')[0].value));
        let ratesMaxValue = 1;
        if (cubeParts.length > 0) {
          ratesMaxValue = Number(cubeParts[cubeParts.length - 1].getItems().filter(p => p.key === 'Value')[0].value);
        }
        const cubePartsCount = cubeParts.length;
        for (let i = 0; i < cubePartsCount; i++) {
            const cubePart = cubeParts[i];
            const color = new Color(cubePart.getItems().filter(p => p.key === 'Color')[0].value);
            let element: Object3D;
            let value = 0;
            if (i === 0) {
                value = Math.sqrt(Number(cubePart.getItems().filter(p => p.key === 'Value')[0].value) / ratesMaxValue);
                element = new CubeFirstElement(value, partsHeight, getBodyMaterial(color)).getElement();
            } else {
                const previousCubePart = cubeParts[i - 1];
                value = Math.sqrt(Number(previousCubePart.getItems().filter(p => p.key === 'Value')[0].value) / ratesMaxValue);
                const value2 = Math.sqrt(Number(cubePart.getItems().filter(p => p.key === 'Value')[0].value) / ratesMaxValue);
                element = new CubeSerialElement(value, value2, partsHeight, getBodyMaterial(color)).getElement();
            }
            const plankSize = 0.035;
            const plankGroup = new Group();
            const plankText = cubePart.getItems().filter(p => p.key === 'Title')[0].value;
            const plankTextShift = -0.3;
            const plankValueShift = -0.15;
            const plankZ = -0.5 + (0.7 + i) / cubePartsCount;
            const plankTextGeometry = this.getTextGeometry(plankText, fontData, plankSize, Anchor.LowerRight);
            const plankTextElement = new Mesh(plankTextGeometry, textsMaterial);
            plankTextElement.translateX(plankTextShift);
            plankGroup.add(plankTextElement);
            const plankValue = cubePart.getItems().filter(p => p.key === 'Value')[0].value;
            const plankValueGeometry = this.getTextGeometry(plankValue, fontData, plankSize, Anchor.LowerCenter);
            const plankValueElement = new Mesh(plankValueGeometry, textsMaterial);
            plankValueElement.translateX(plankValueShift);
            plankGroup.add(plankValueElement);
            const plankValueBackGeometry = new PlaneGeometry(0.2, plankSize * 1.7);
            uvMapProjector.box(plankValueBackGeometry);
            const plankValueBackElement = new Mesh(plankValueBackGeometry, getBodyMaterial(color));
            plankValueBackElement.translateOnAxis(new Vector3(plankValueShift, 0.02, - 0.01), 1);
            plankGroup.add(plankValueBackElement);
            plankGroup.translateOnAxis(new Vector3(-0.5, 0.05, plankZ), 1);
            plankGroup.rotateX(-1);
            group.add(plankGroup);
            group.add(element);
        }
        if (cubePartsCount === 0) {
          const element = new CubeFirstElement(1, partsHeight, getBodyMaterial('gray')).getElement();
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
            const geometry = new BoxGeometry(width, ratesThickness, ratesThickness);
            const element = new Mesh(geometry, getBodyMaterial(color));
            element.translateOnAxis(new Vector3((width - 1) * 0.5 + widths, partsHeight + ratesThickness * 0.5, (ratesThickness - 1) * 0.5), 1);
            uvMapProjector.box(geometry);
            widths = widths + width;
            group.add(element);
        });
        if (cubeRates.length === 0) {
          const geometry = new BoxGeometry(1, ratesThickness, ratesThickness);
          uvMapProjector.box(geometry);
          const element = new Mesh(geometry, getBodyMaterial('gray'));
          element.translateOnAxis(new Vector3(0, partsHeight + ratesThickness * 0.5, (ratesThickness - 1) * 0.5), 1);
          group.add(element);
        }

        const cubeTitle = this.items.filter(p => p.key === 'Title')[0].value;
        const ratesTitle = cubeRatesRoot.getItems().filter(p => p.key === 'Title')[0].value;
        let leftRateValue = '0';
        let rightRateValue = '0';
        let leftPercentValue = '0';
        let rightPercentValue = '0';
        let leftText = 'no data';
        let rightText = 'no data';
        let leftRateColor = 'gray';
        let rightRateColor = 'gray';
        if (cubeRates.length > 0) {
          leftRateValue = cubeRates[0].getItems().filter(p => p.key === 'Value')[0].value;
          rightRateValue = cubeRates[cubeRates.length - 1].getItems().filter(p => p.key === 'Value')[0].value;
          leftPercentValue = cubeRates[0].getItems().filter(p => p.key === 'Percent')[0].value;
          rightPercentValue = cubeRates[cubeRates.length - 1].getItems().filter(p => p.key === 'Percent')[0].value;
          leftText = cubeRates[0].getItems().filter(p => p.key === 'Title')[0].value;
          rightText = cubeRates[cubeRates.length - 1].getItems().filter(p => p.key === 'Title')[0].value;
          leftRateColor = cubeRates[0].getItems().filter(p => p.key === 'Color')[0].value;
          rightRateColor = cubeRates[cubeRates.length - 1].getItems().filter(p => p.key === 'Color')[0].value;
        }
        const ratesTitleSize = 0.04;
        const ratesValueSize = 0.05;
        const percentValueSize = 0.12;
        const ratTextsSize = 0.05;
        const cubeTitleSize = 0.065;
        const rateValuesGroup = new Group();
        const ratesTitleGeometry = this.getTextGeometry(ratesTitle, fontData, ratesTitleSize, Anchor.LowerCenter);
        const ratesTitleElement = new Mesh(ratesTitleGeometry, textsMaterial);
        let elevation = partsHeight + ratesThickness;
        ratesTitleElement.translateY(elevation + ratesTitleSize * 0.5);
        rateValuesGroup.add(ratesTitleElement);
        const leftRateValueGeometry = this.getTextGeometry(leftRateValue, fontData, ratesValueSize, Anchor.LowerLeft);
        const leftRateValueElement = new Mesh(leftRateValueGeometry, textsMaterial);
        const rightRateValueGeometry = this.getTextGeometry(rightRateValue, fontData, ratesValueSize, Anchor.LowerRight);
        const rightRateValueElement = new Mesh(rightRateValueGeometry, textsMaterial);
        elevation += ratesValueSize * 0.2;
        leftRateValueElement.translateOnAxis(new Vector3(-0.45, elevation, 0), 1);
        rightRateValueElement.translateOnAxis(new Vector3(0.45, elevation, 0), 1);
        rateValuesGroup.add(rightRateValueElement);
        rateValuesGroup.add(leftRateValueElement);
        const leftPercentGeometry = this.getTextGeometry(leftPercentValue + ' %', fontData, percentValueSize, Anchor.LowerCenter);
        const rightPercentGeometry = this.getTextGeometry(rightPercentValue + ' %', fontData, percentValueSize, Anchor.LowerCenter);
        const leftPercentElement = new Mesh(leftPercentGeometry, textsMaterial);
        const rightPercentElement = new Mesh(rightPercentGeometry, textsMaterial);
        elevation += percentValueSize * 0.8;
        leftPercentElement.translateOnAxis(new Vector3(-0.25, elevation, 0), 1);
        rightPercentElement.translateOnAxis(new Vector3(0.25, elevation, 0), 1);
        rateValuesGroup.add(leftPercentElement);
        rateValuesGroup.add(rightPercentElement);
        const leftTextGeometry = this.getTextGeometry(leftText, fontData, ratTextsSize, Anchor.LowerCenter);
        const rightTextGeometry = this.getTextGeometry(rightText, fontData, ratTextsSize, Anchor.LowerCenter);
        const leftTextElement = new Mesh(leftTextGeometry, textsMaterial);
        const rightTextElement = new Mesh(rightTextGeometry, textsMaterial);
        elevation += ratTextsSize * 4;
        leftTextElement.translateOnAxis(new Vector3(-0.25, elevation, 0), 1);
        rightTextElement.translateOnAxis(new Vector3(0.25, elevation, 0), 1);
        rateValuesGroup.add(leftTextElement);
        rateValuesGroup.add(rightTextElement);
        const leftTextBackGeometry = new PlaneGeometry(0.4, ratTextsSize * 1.7);
        uvMapProjector.box(leftTextBackGeometry);
        const rightTextBackGeometry = leftTextBackGeometry.clone();
        const leftTextBackElement = new Mesh(leftTextBackGeometry, getBodyMaterial(leftRateColor));
        const rightTextBackElement = new Mesh(leftTextBackGeometry, getBodyMaterial(rightRateColor));
        leftTextBackElement.translateOnAxis(new Vector3(-0.25, elevation + 0.025, -0.005), 1);
        rightTextBackElement.translateOnAxis(new Vector3(0.25, elevation + 0.025, -0.005), 1);
        rateValuesGroup.add(leftTextBackElement);
        rateValuesGroup.add(rightTextBackElement);
        const cubeTitleGeometry = this.getTextGeometry(cubeTitle, fontData, cubeTitleSize, Anchor.LowerCenter);
        const cubeTitleElement = new Mesh(cubeTitleGeometry, textsMaterial);
        elevation += cubeTitleSize * 1.5;
        cubeTitleElement.translateY(elevation);
        rateValuesGroup.add(cubeTitleElement);
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
