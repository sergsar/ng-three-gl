"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ElementProviderService = /** @class */ (function () {
    function ElementProviderService() {
    }
    ElementProviderService.prototype.getImage = function (url) {
        return new Promise(function (resolve, reject) {
            var image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
            image.setAttribute('src', url);
            image.setAttribute('crossOrigin', 'Anonymous');
            image.addEventListener('load', function () { resolve(image); }, false);
            image.addEventListener('error', function () { reject(new Error('Image provider service error')); }, false);
        });
    };
    ElementProviderService = __decorate([
        core_1.Injectable()
    ], ElementProviderService);
    return ElementProviderService;
}());
exports.ElementProviderService = ElementProviderService;
//# sourceMappingURL=element-provider.service.js.map