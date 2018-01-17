"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var three_basis_module_1 = require("../../three-basis/three-basis.module");
var cube_control_component_1 = require("./cube-control.component");
var components_elementary_module_1 = require("../../components-elementary/components-elementary.module");
var data_provider_service_1 = require("../../data.provider.service");
var element_provider_service_1 = require("../../three-basis/element-provider.service");
var CubeControlModule = /** @class */ (function () {
    function CubeControlModule() {
    }
    CubeControlModule = __decorate([
        core_1.NgModule({
            imports: [three_basis_module_1.ThreeBasisModule, components_elementary_module_1.ComponentsElementaryModule],
            declarations: [cube_control_component_1.CubeControlComponent],
            exports: [cube_control_component_1.CubeControlComponent],
            providers: [data_provider_service_1.DataProviderService, element_provider_service_1.ElementProviderService]
        })
    ], CubeControlModule);
    return CubeControlModule;
}());
exports.CubeControlModule = CubeControlModule;
//# sourceMappingURL=cube-control.module.js.map