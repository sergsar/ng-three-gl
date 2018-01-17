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
var Object3dComponent = /** @class */ (function () {
    function Object3dComponent() {
        this.objects3D = new core_1.QueryList();
    }
    Object3dComponent_1 = Object3dComponent;
    Object3dComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.objects3D.forEach(function (p) {
            var object = p.getObject3D();
            if (object !== _this.object3d) {
                _this.object3d.add(object);
            }
        });
    };
    Object3dComponent.prototype.getObject3D = function () {
        return this.object3d;
    };
    __decorate([
        core_1.ContentChildren(Object3dComponent_1),
        __metadata("design:type", core_1.QueryList)
    ], Object3dComponent.prototype, "objects3D", void 0);
    Object3dComponent = Object3dComponent_1 = __decorate([
        core_1.Component({ template: '' })
    ], Object3dComponent);
    return Object3dComponent;
    var Object3dComponent_1;
}());
exports.Object3dComponent = Object3dComponent;
//# sourceMappingURL=object3d.component.js.map