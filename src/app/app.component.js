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
var data_provider_service_1 = require("./data.provider.service");
var http_1 = require("@angular/common/http");
var AppComponent = /** @class */ (function () {
    function AppComponent(dataProviderService) {
        this.dataProviderService = dataProviderService;
    } // TODO: delete after data providers completed, only needed for data tests
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders((_a = {}, _a['X-Tenant-Id'] = 'logus', _a));
        var options = { headers: headers };
        var url = 'https://presentation.idvp.net/checkin/file/checkin.json';
        this.dataProviderService.getObservable(url, options).subscribe(function (p) { return _this.data = p; });
        var _a;
    };
    AppComponent = __decorate([
        core_1.Component({ selector: 'my-app', templateUrl: './app.component.html' }),
        __metadata("design:paramtypes", [data_provider_service_1.DataProviderService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map