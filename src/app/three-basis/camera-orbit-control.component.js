"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var camera_provider_service_1 = require("./camera-provider.service");
var three_orbitcontrols_ts_1 = require("three-orbitcontrols-ts");
var CameraOrbitControlComponent = /** @class */ (function () {
    function CameraOrbitControlComponent(cameraProvider) {
        this.cameraProvider = cameraProvider;
        var perspectiveCamera = this.cameraProvider.getPerspectiveCamera();
        var controls = new three_orbitcontrols_ts_1.OrbitControls(perspectiveCamera);
        controls.addEventListener('change', function () { });
    }
    CameraOrbitControlComponent = __decorate([
        core_1.Component({ selector: 'camera-orbit-control', template: '' }),
        __metadata("design:paramtypes", [camera_provider_service_1.CameraProvider])
    ], CameraOrbitControlComponent);
    return CameraOrbitControlComponent;
}());
exports.CameraOrbitControlComponent = CameraOrbitControlComponent;
//# sourceMappingURL=camera-orbit-control.component.js.map