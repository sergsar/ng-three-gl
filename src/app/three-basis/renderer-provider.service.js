"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var three_1 = require("three");
var RendererProvider = /** @class */ (function () {
    function RendererProvider() {
        this.renderers = new Map();
    }
    RendererProvider.prototype.getRenderer = function (parameters, id) {
        var renderer = this.renderers.get(id);
        if (renderer == null) {
            renderer = new three_1.WebGLRenderer(parameters);
            this.renderers.set(id, renderer);
        }
        return renderer;
    };
    RendererProvider = __decorate([
        core_1.Injectable()
    ], RendererProvider);
    return RendererProvider;
}());
exports.RendererProvider = RendererProvider;
//# sourceMappingURL=renderer-provider.service.js.map