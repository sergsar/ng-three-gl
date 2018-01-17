"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var renderer_component_1 = require("./renderer.component");
var scene_component_1 = require("./scene.component");
var perspective_camera_component_1 = require("./perspective-camera.component");
var three_area_component_1 = require("./three-area.component");
var direct_light_component_1 = require("./direct-light.component");
var hemisphere_light_component_1 = require("./hemisphere-light.component");
var renderer_provider_service_1 = require("./renderer-provider.service");
var camera_provider_service_1 = require("./camera-provider.service");
var scene_provider_service_1 = require("./scene-provider.service");
var camera_orbit_control_component_1 = require("./camera-orbit-control.component");
var animate_provider_service_1 = require("./animate-provider.service");
var box_control_component_1 = require("./box-control.component");
var ThreeBasisModule = /** @class */ (function () {
    function ThreeBasisModule() {
    }
    ThreeBasisModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [
                three_area_component_1.ThreeAreaComponent,
                direct_light_component_1.DirectLightComponent,
                hemisphere_light_component_1.HemisphereLightComponent,
                renderer_component_1.RendererComponent,
                scene_component_1.SceneComponent,
                perspective_camera_component_1.PerspectiveCameraComponent,
                camera_orbit_control_component_1.CameraOrbitControlComponent,
                box_control_component_1.BoxControlComponent
            ],
            exports: [
                three_area_component_1.ThreeAreaComponent,
                direct_light_component_1.DirectLightComponent,
                hemisphere_light_component_1.HemisphereLightComponent,
                renderer_component_1.RendererComponent,
                scene_component_1.SceneComponent,
                perspective_camera_component_1.PerspectiveCameraComponent,
                camera_orbit_control_component_1.CameraOrbitControlComponent,
                box_control_component_1.BoxControlComponent
            ],
            providers: [
                animate_provider_service_1.AnimateProvider,
                renderer_provider_service_1.RendererProvider,
                camera_provider_service_1.CameraProvider,
                scene_provider_service_1.SceneProvider
            ]
        })
    ], ThreeBasisModule);
    return ThreeBasisModule;
}());
exports.ThreeBasisModule = ThreeBasisModule;
//# sourceMappingURL=three-basis.module.js.map