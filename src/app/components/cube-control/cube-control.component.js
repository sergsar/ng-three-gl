"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var object3d_component_1 = require("../../three-basis/object3d.component");
var cube_first_element_1 = require("./cube-first-element");
var three_1 = require("three");
var cube_serial_element_1 = require("./cube-serial-element");
var bind_object_component_1 = require("../../components-elementary/bind-object.component");
var data_provider_service_1 = require("../../data.provider.service");
var anchor_1 = require("../../three-basis/anchor");
var anchor_to_vector2_1 = require("../../three-basis/anchor-to-vector2");
var element_provider_service_1 = require("../../three-basis/element-provider.service");
var bind_item_component_1 = require("../../components-elementary/bind-item.component");
var CubeControlComponent = /** @class */ (function (_super) {
    __extends(CubeControlComponent, _super);
    function CubeControlComponent(dataProviderService, elementProviderService) {
        var _this = _super.call(this) || this;
        _this.objects = new core_1.QueryList();
        _this.items = new core_1.QueryList();
        _this.dataProviderService = dataProviderService;
        _this.elementProviderService = elementProviderService;
        return _this;
    }
    CubeControlComponent_1 = CubeControlComponent;
    CubeControlComponent.prototype.ngAfterContentInit = function () {
        this.object3d = new three_1.Group();
        this.createComponent();
    };
    CubeControlComponent.prototype.createComponent = function () {
        return __awaiter(this, void 0, void 0, function () {
            function getBodyMaterial(color) { return new three_1.MeshLambertMaterial({ color: color, map: texture }); }
            var fontUrl, fontData, textureUrl, texture, _a, group, partsHeight, cubePartsRoot, cubeParts, ratesMaxValue, i, cubePart, color, element, value, previousCubePart, value, value2, ratesThickness, cubeRatesRoot, cubeRates, ratesSum, widths, ratesTitle, leftRateValue, rightRateValue, textsMaterial, ratesTitleSize, ratesValueSize, rateValuesGroup, ratesTitleGeometry, ratesTitleElement, leftRateValueGeometry, leftRateValueElement, rightRateValueGeometry, rightRateValueElement;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fontUrl = 'assets/fonts/helvetiker_regular.typeface.json';
                        return [4 /*yield*/, this.dataProviderService.getAwait(fontUrl)];
                    case 1:
                        fontData = _b.sent();
                        textureUrl = 'assets/textures/UV_Grid_Sm.jpg';
                        texture = new three_1.Texture();
                        _a = texture;
                        return [4 /*yield*/, this.elementProviderService.getImage(textureUrl)];
                    case 2:
                        _a.image = _b.sent();
                        texture.format = three_1.RGBFormat;
                        texture.needsUpdate = true;
                        group = this.object3d;
                        partsHeight = 0.1;
                        cubePartsRoot = this.objects.filter(function (p) { return p.name === 'CubeParts'; })[0];
                        cubeParts = cubePartsRoot.getObjects().filter(function (p) { return p.name === 'CubePart'; }).sort(function (p) { return -Number(p.getItems().filter(function (p1) { return p1.key === 'Value'; })[0].value); });
                        ratesMaxValue = Number(cubeParts[cubeParts.length - 1].getItems().filter(function (p) { return p.key === 'Value'; })[0].value);
                        for (i = 0; i < cubeParts.length; i++) {
                            cubePart = cubeParts[i];
                            color = new three_1.Color(cubePart.getItems().filter(function (p) { return p.key === 'Color'; })[0].value);
                            element = void 0;
                            if (i === 0) {
                                value = Math.sqrt(Number(cubePart.getItems().filter(function (p) { return p.key === 'Value'; })[0].value) / ratesMaxValue);
                                element = new cube_first_element_1.CubeFirstElement(value, partsHeight, getBodyMaterial(color)).getElement();
                            }
                            else {
                                previousCubePart = cubeParts[i - 1];
                                value = Math.sqrt(Number(previousCubePart.getItems().filter(function (p) { return p.key === 'Value'; })[0].value) / ratesMaxValue);
                                value2 = Math.sqrt(Number(cubePart.getItems().filter(function (p) { return p.key === 'Value'; })[0].value) / ratesMaxValue);
                                element = new cube_serial_element_1.CubeSerialElement(value, value2, partsHeight, getBodyMaterial(color)).getElement();
                            }
                            group.add(element);
                        }
                        ratesThickness = 0.08;
                        cubeRatesRoot = this.objects.filter(function (p) { return p.name === 'CubeRates'; })[0];
                        cubeRates = cubeRatesRoot.getObjects().filter(function (p) { return p.name === 'CubeRate'; });
                        ratesSum = cubeRates.map(function (p) { return Number(p.getItems().filter(function (p1) { return p1.key === 'Value'; })[0].value); }).reduce(function (p, p1) { return p + p1; }, 0);
                        widths = 0;
                        cubeRates.forEach(function (rate) {
                            var value = Number(rate.getItems().filter(function (p) { return p.key === 'Value'; })[0].value);
                            var width = value / ratesSum;
                            var color = rate.getItems().filter(function (p) { return p.key === 'Color'; })[0].value;
                            var element = new three_1.Mesh(new three_1.BoxGeometry(width, ratesThickness, ratesThickness), getBodyMaterial(color));
                            element.translateOnAxis(new three_1.Vector3((width - 1) * 0.5 + widths, partsHeight + ratesThickness * 0.5, (ratesThickness - 1) * 0.5), 1);
                            widths = widths + width;
                            group.add(element);
                        });
                        ratesTitle = cubeRatesRoot.getItems().filter(function (p) { return p.key === 'Title'; })[0].value;
                        leftRateValue = cubeRates[0].getItems().filter(function (p) { return p.key === 'Value'; })[0].value;
                        rightRateValue = cubeRates[cubeRates.length - 1].getItems().filter(function (p) { return p.key === 'Value'; })[0].value;
                        textsMaterial = new three_1.MeshBasicMaterial({ color: 'white' });
                        ratesTitleSize = 0.04;
                        ratesValueSize = 0.05;
                        rateValuesGroup = new three_1.Group();
                        ratesTitleGeometry = this.getTextGeometry(ratesTitle, fontData, ratesTitleSize, anchor_1.Anchor.LowerCenter);
                        ratesTitleElement = new three_1.Mesh(ratesTitleGeometry, textsMaterial);
                        ratesTitleElement.translateY(partsHeight + ratesThickness + ratesTitleSize * 0.5);
                        rateValuesGroup.add(ratesTitleElement);
                        leftRateValueGeometry = this.getTextGeometry(leftRateValue, fontData, ratesValueSize, anchor_1.Anchor.LowerLeft);
                        leftRateValueElement = new three_1.Mesh(leftRateValueGeometry, textsMaterial);
                        rightRateValueGeometry = this.getTextGeometry(rightRateValue, fontData, ratesValueSize, anchor_1.Anchor.LowerRight);
                        rightRateValueElement = new three_1.Mesh(rightRateValueGeometry, textsMaterial);
                        leftRateValueElement.translateOnAxis(new three_1.Vector3(-0.45, partsHeight + ratesThickness + ratesValueSize * 0.2, 0), 1);
                        rightRateValueElement.translateOnAxis(new three_1.Vector3(0.45, partsHeight + ratesThickness + ratesValueSize * 0.2, 0), 1);
                        rateValuesGroup.add(rightRateValueElement);
                        rateValuesGroup.add(leftRateValueElement);
                        rateValuesGroup.translateZ(-0.5);
                        group.add(rateValuesGroup);
                        return [2 /*return*/];
                }
            });
        });
    };
    CubeControlComponent.prototype.getTextGeometry = function (text, fontData, size, anchor) {
        if (anchor === void 0) { anchor = anchor_1.Anchor.MiddleCenter; }
        var font = new three_1.Font(fontData);
        var shapes = font.generateShapes(text, size, 1);
        var shapeGeometry = new three_1.ShapeGeometry(shapes);
        shapeGeometry.computeBoundingBox();
        var vector2 = anchor_to_vector2_1.anchorToVector2(anchor);
        var xMid = -0.5 * (vector2.x + 1) * (shapeGeometry.boundingBox.max.x - shapeGeometry.boundingBox.min.x);
        var yMid = -0.5 * (vector2.y + 1) * (shapeGeometry.boundingBox.max.y - shapeGeometry.boundingBox.min.y);
        shapeGeometry.translate(xMid, yMid, 0);
        var bufferGeometry = new three_1.BufferGeometry();
        bufferGeometry.fromGeometry(shapeGeometry);
        return bufferGeometry;
    };
    __decorate([
        core_1.ContentChildren(bind_object_component_1.BindObjectComponent),
        __metadata("design:type", core_1.QueryList)
    ], CubeControlComponent.prototype, "objects", void 0);
    __decorate([
        core_1.ContentChildren(bind_item_component_1.BindItemComponent),
        __metadata("design:type", core_1.QueryList)
    ], CubeControlComponent.prototype, "items", void 0);
    CubeControlComponent = CubeControlComponent_1 = __decorate([
        core_1.Component({
            selector: 'cube-control',
            template: '<ng-content></ng-content>',
            providers: [{ provide: object3d_component_1.Object3dComponent, useExisting: core_1.forwardRef(function () { return CubeControlComponent_1; }) }]
        }),
        __metadata("design:paramtypes", [data_provider_service_1.DataProviderService, element_provider_service_1.ElementProviderService])
    ], CubeControlComponent);
    return CubeControlComponent;
    var CubeControlComponent_1;
}(object3d_component_1.Object3dComponent));
exports.CubeControlComponent = CubeControlComponent;
//# sourceMappingURL=cube-control.component.js.map