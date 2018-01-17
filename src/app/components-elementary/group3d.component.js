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
var three_1 = require("three");
var object3d_component_1 = require("../three-basis/object3d.component");
var Group3dComponent = /** @class */ (function (_super) {
    __extends(Group3dComponent, _super);
    function Group3dComponent() {
        var _this = _super.call(this) || this;
        _this.object3d = new three_1.Group();
        return _this;
    }
    Group3dComponent_1 = Group3dComponent;
    Group3dComponent = Group3dComponent_1 = __decorate([
        core_1.Component({
            selector: 'group-3d',
            template: '<ng-content></ng-content>',
            providers: [{ provide: object3d_component_1.Object3dComponent, useExisting: core_1.forwardRef(function () { return Group3dComponent_1; }) }]
        }),
        __metadata("design:paramtypes", [])
    ], Group3dComponent);
    return Group3dComponent;
    var Group3dComponent_1;
}(object3d_component_1.Object3dComponent));
exports.Group3dComponent = Group3dComponent;
//# sourceMappingURL=group3d.component.js.map