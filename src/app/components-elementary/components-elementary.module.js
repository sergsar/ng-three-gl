"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var group3d_component_1 = require("./group3d.component");
var bind_object_component_1 = require("./bind-object.component");
var bind_item_component_1 = require("./bind-item.component");
var ComponentsElementaryModule = /** @class */ (function () {
    function ComponentsElementaryModule() {
    }
    ComponentsElementaryModule = __decorate([
        core_1.NgModule({
            declarations: [group3d_component_1.Group3dComponent, bind_object_component_1.BindObjectComponent, bind_item_component_1.BindItemComponent],
            exports: [group3d_component_1.Group3dComponent, bind_object_component_1.BindObjectComponent, bind_item_component_1.BindItemComponent]
        })
    ], ComponentsElementaryModule);
    return ComponentsElementaryModule;
}());
exports.ComponentsElementaryModule = ComponentsElementaryModule;
//# sourceMappingURL=components-elementary.module.js.map