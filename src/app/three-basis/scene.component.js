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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var perspective_camera_component_1 = require("./perspective-camera.component");
var scene_provider_service_1 = require("./scene-provider.service");
var object3d_component_1 = require("./object3d.component");
var SceneComponent = /** @class */ (function (_super) {
    __extends(SceneComponent, _super);
    function SceneComponent(sceneProvider) {
        var _this = _super.call(this) || this;
        _this.sceneProvider = sceneProvider;
        _this.object3d = _this.sceneProvider.getScene();
        return _this;
    }
    SceneComponent_1 = SceneComponent;
    Object.defineProperty(SceneComponent.prototype, "scene", {
        get: function () {
            return this.object3d;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChild(perspective_camera_component_1.PerspectiveCameraComponent),
        __metadata("design:type", perspective_camera_component_1.PerspectiveCameraComponent)
    ], SceneComponent.prototype, "perspectiveCameraComponent", void 0);
    SceneComponent = SceneComponent_1 = __decorate([
        core_1.Component({
            selector: 'scene',
            templateUrl: './scene.component.html',
            providers: [{ provide: object3d_component_1.Object3dComponent, useExisting: core_1.forwardRef(function () { return SceneComponent_1; }) }]
        }),
        __metadata("design:paramtypes", [scene_provider_service_1.SceneProvider])
    ], SceneComponent);
    return SceneComponent;
    var SceneComponent_1;
}(object3d_component_1.Object3dComponent));
exports.SceneComponent = SceneComponent;
//# sourceMappingURL=scene.component.js.map