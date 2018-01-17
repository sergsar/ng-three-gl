"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var three_basis_module_1 = require("./three-basis/three-basis.module");
var data_provider_service_1 = require("./data.provider.service");
var http_1 = require("@angular/common/http");
var components_module_1 = require("./components/components.module");
var components_elementary_module_1 = require("./components-elementary/components-elementary.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, three_basis_module_1.ThreeBasisModule, http_1.HttpClientModule, components_module_1.ComponentsModule, components_elementary_module_1.ComponentsElementaryModule],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [data_provider_service_1.DataProviderService] // TODO: delete, only needed for dataprov tests
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map