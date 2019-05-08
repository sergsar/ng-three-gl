// tslint:disable:cyclomatic-complexity
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BoxGeometry, BufferGeometry, Color, Font, Group, Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, Object3D,
    PlaneGeometry, RepeatWrapping, RGBFormat, ShapeGeometry, Texture, Vector3 } from 'three';
import { DataProviderService } from '../../services/data.provider.service';
import { ElementProviderService } from '../../services/element-provider.service';
import { Anchor } from '../../three-basis/anchor';
import { anchorToVector2 } from '../../three-basis/anchor-to-vector2';
import { GroupProvider } from '../../three-basis/group-provider.service';
import { Object3dComponent } from '../../three-basis/object3d.component';
import { UvMapProjector } from '../../three-basis/uv-map-projector';
import { CubeFirstElement } from './cube-first-element';
import { CubeSerialElement } from './cube-serial-element';

@Component({
    selector: 'three-cube',
    templateUrl: './cube.component.html',
    styleUrls: ['./cube.component.scss'],
    providers: [GroupProvider],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent extends Object3dComponent implements OnInit {

    @Input()
    public set title(value: string) {
        if(this.cubeTitleElement) {
            const cubeTitleGeometry = this.getTextGeometry(value, this.fontData, this.cubeTitleSize, Anchor.LowerCenter);
            this.cubeTitleElement.geometry = cubeTitleGeometry;
        }
    }

    private texture: Texture;
    private cubeTitleElement: Mesh;
    private cubeTitleSize: number = 0.065;
    private fontData: string;

    constructor(
        private dataProviderService: DataProviderService,
        private elementProviderService: ElementProviderService,
        groupProvider: GroupProvider
    ) {
        super(groupProvider);
    }

    public ngOnInit(): void {
        this.createComponent();
    }

    private async createComponent(): Promise<void> {

        const fontUrl = 'assets/fonts/arial_regular.typeface.json';
        this.fontData = await this.dataProviderService.getAwait<string>(fontUrl);
        const cubeDataUrl = 'assets/data/cube/cube.json';
        const cubeData = await this.dataProviderService.getAwait<string>(cubeDataUrl) as any;
        const textsMaterial = new MeshBasicMaterial({color: 'white'});
        const textureUrl = 'assets/textures/KUB.JPG';
        this.texture = new Texture();
        const texture = this.texture;
        texture.image = await this.elementProviderService.getImage(textureUrl);
        texture.format = RGBFormat;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.needsUpdate = true;

        const uvMapProjector = new UvMapProjector();

        const partsHeight = 0.1;

        const cubePartsRoot = cubeData && cubeData.CubeParts;

        let cubeParts = cubePartsRoot && cubePartsRoot.Parts;

        let ratesMaxValue = 1;
        if (cubeParts && cubeParts.length && cubeParts.length > 0) {
            ratesMaxValue = Math.max(...cubeParts.map(p => Number(p.Value)));
            cubeParts = cubeParts.sort((a, b) => Number(a.Value) - Number(b.Value));
        }
        const cubePartsCount = cubeParts && cubeParts.length || 0;

        for (let i = 0; i < cubePartsCount; i++) {
            const cubePart = cubeParts[i];
            const color = new Color(cubeParts[i].Color);
            let element: Object3D;
            let value = 0;
            if (i === 0) {
                value = Math.sqrt(Number(cubePart.Value) / ratesMaxValue);
                element = new CubeFirstElement(value, partsHeight, this.getBodyMaterial(color)).getElement();
            } else {
                const previousCubePart = cubeParts[i - 1];
                value = Math.sqrt(Number(previousCubePart.Value) / ratesMaxValue);
                const value2 = Math.sqrt(Number(cubePart.Value) / ratesMaxValue);
                element = new CubeSerialElement(value, value2, partsHeight, this.getBodyMaterial(color)).getElement();
            }
            const plankSize = 0.035;
            const plankGroup = new Group();
            const plankText = cubePart.Title;
            const plankTextShift = -0.3;
            const plankValueShift = -0.15;
            const plankZ = -0.5 + (0.7 + i) / cubePartsCount;
            const plankTextGeometry = this.getTextGeometry(plankText, this.fontData, plankSize, Anchor.LowerRight);
            const plankTextElement = new Mesh(plankTextGeometry, textsMaterial);
            plankTextElement.translateX(plankTextShift);
            plankGroup.add(plankTextElement);
            const plankValue = cubePart.Value;
            const plankValueGeometry = this.getTextGeometry(plankValue, this.fontData, plankSize, Anchor.LowerCenter);
            const plankValueElement = new Mesh(plankValueGeometry, textsMaterial);
            plankValueElement.translateX(plankValueShift);
            plankGroup.add(plankValueElement);
            const plankValueBackGeometry = new PlaneGeometry(0.2, plankSize * 1.7);
            uvMapProjector.box(plankValueBackGeometry);
            const plankValueBackElement = new Mesh(plankValueBackGeometry, this.getBodyMaterial(color));
            plankValueBackElement.translateOnAxis(new Vector3(plankValueShift, 0.02, - 0.01), 1);
            plankGroup.add(plankValueBackElement);
            plankGroup.translateOnAxis(new Vector3(-0.5, 0.05, plankZ), 1);
            plankGroup.rotateX(-1);
            this.Group.add(plankGroup);
            this.Group.add(element);
        }

        if (cubePartsCount === 0) {
            const element = new CubeFirstElement(1, partsHeight, this.getBodyMaterial('gray')).getElement();
            this.Group.add(element);
        }

        const ratesThickness = 0.08;
        const cubeRatesRoot = cubeData && cubeData.CubeRates;
        const cubeRates = cubeRatesRoot && cubeRatesRoot.Rates;
        const ratesSum = cubeRates && cubeRates.map(p => Number(p.Value)).reduce((p, o) => p + o) || 0;

        let widths = 0;
        if(cubeRates) {
            cubeRates.forEach(rate => {
                const value = Number(rate.Value);
                const width = value / ratesSum;
                const color = rate.Color;
                const geometry = new BoxGeometry(width, ratesThickness, ratesThickness);
                const element = new Mesh(geometry, this.getBodyMaterial(color));
                element.translateOnAxis(
                    new Vector3(
                        (width - 1) * 0.5 + widths,
                        partsHeight + ratesThickness * 0.5,
                        (ratesThickness - 1) * 0.5), 1);
                uvMapProjector.box(geometry);
                widths = widths + width;
                this.Group.add(element);
            });
        }

        if (!(cubeRates && cubeRates.length !== 0)) {
            const geometry = new BoxGeometry(1, ratesThickness, ratesThickness);
            uvMapProjector.box(geometry);
            const element = new Mesh(geometry, this.getBodyMaterial('gray'));
            element.translateOnAxis(new Vector3(0, partsHeight + ratesThickness * 0.5, (ratesThickness - 1) * 0.5), 1);
            this.Group.add(element);
        }

        const cubeTitle = cubeData && cubeData.Title || '';
        const ratesTitle = cubeRatesRoot && cubeRatesRoot.Title || '';
        let leftRateValue = '0';
        let rightRateValue = '0';
        let leftPercentValue = '0';
        let rightPercentValue = '0';
        let leftText = 'no data';
        let rightText = 'no data';
        let leftRateColor = 'gray';
        let rightRateColor = 'gray';
        if (cubeRates && cubeRates.length && cubeRates.length > 0) {
            leftRateValue = cubeRates[0].Value;
            rightRateValue = cubeRates[cubeRates.length - 1].Value;
            leftPercentValue = cubeRates[0].Percent;
            rightPercentValue = cubeRates[cubeRates.length - 1].Percent;
            leftText = cubeRates[0].Title;
            rightText = cubeRates[cubeRates.length - 1].Title;
            leftRateColor = cubeRates[0].Color;
            rightRateColor = cubeRates[cubeRates.length - 1].Color;
        }
        const ratesTitleSize = 0.04;
        const ratesValueSize = 0.05;
        const percentValueSize = 0.12;
        const ratTextsSize = 0.05;
        const rateValuesGroup = new Group();
        const ratesTitleGeometry = this.getTextGeometry(ratesTitle, this.fontData, ratesTitleSize, Anchor.LowerCenter);
        const ratesTitleElement = new Mesh(ratesTitleGeometry, textsMaterial);
        let elevation = partsHeight + ratesThickness;
        ratesTitleElement.translateY(elevation + ratesTitleSize * 0.5);
        rateValuesGroup.add(ratesTitleElement);
        const leftRateValueGeometry = this.getTextGeometry(leftRateValue, this.fontData, ratesValueSize, Anchor.LowerLeft);
        const leftRateValueElement = new Mesh(leftRateValueGeometry, textsMaterial);
        const rightRateValueGeometry = this.getTextGeometry(rightRateValue, this.fontData, ratesValueSize, Anchor.LowerRight);
        const rightRateValueElement = new Mesh(rightRateValueGeometry, textsMaterial);
        elevation += ratesValueSize * 0.2;
        leftRateValueElement.translateOnAxis(new Vector3(-0.45, elevation, 0), 1);
        rightRateValueElement.translateOnAxis(new Vector3(0.45, elevation, 0), 1);
        rateValuesGroup.add(rightRateValueElement);
        rateValuesGroup.add(leftRateValueElement);
        const leftPercentGeometry = this.getTextGeometry(`${leftPercentValue} %`, this.fontData, percentValueSize, Anchor.LowerCenter);
        const rightPercentGeometry = this.getTextGeometry(`${rightPercentValue} %`, this.fontData, percentValueSize, Anchor.LowerCenter);
        const leftPercentElement = new Mesh(leftPercentGeometry, textsMaterial);
        const rightPercentElement = new Mesh(rightPercentGeometry, textsMaterial);
        elevation += percentValueSize * 0.8;
        leftPercentElement.translateOnAxis(new Vector3(-0.25, elevation, 0), 1);
        rightPercentElement.translateOnAxis(new Vector3(0.25, elevation, 0), 1);
        rateValuesGroup.add(leftPercentElement);
        rateValuesGroup.add(rightPercentElement);
        const leftTextGeometry = this.getTextGeometry(leftText, this.fontData, ratTextsSize, Anchor.LowerCenter);
        const rightTextGeometry = this.getTextGeometry(rightText, this.fontData, ratTextsSize, Anchor.LowerCenter);
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
        const leftTextBackElement = new Mesh(leftTextBackGeometry, this.getBodyMaterial(leftRateColor));
        const rightTextBackElement = new Mesh(leftTextBackGeometry, this.getBodyMaterial(rightRateColor));
        leftTextBackElement.translateOnAxis(new Vector3(-0.25, elevation + 0.025, -0.005), 1);
        rightTextBackElement.translateOnAxis(new Vector3(0.25, elevation + 0.025, -0.005), 1);
        rateValuesGroup.add(leftTextBackElement);
        rateValuesGroup.add(rightTextBackElement);
        const cubeTitleGeometry = this.getTextGeometry(cubeTitle, this.fontData, this.cubeTitleSize, Anchor.LowerCenter);
        this.cubeTitleElement = new Mesh(cubeTitleGeometry, textsMaterial);
        elevation += this.cubeTitleSize * 1.5;
        this.cubeTitleElement.translateY(elevation);
        rateValuesGroup.add(this.cubeTitleElement);
        rateValuesGroup.translateZ(-0.5);
        this.Group.add(rateValuesGroup);
    }

    private getBodyMaterial = (color: any) : Material =>
        new MeshLambertMaterial({color, map: this.texture});

    private getTextGeometry = (text: string, fontData: string, size: number, anchor: Anchor = Anchor.MiddleCenter): BufferGeometry => {
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
