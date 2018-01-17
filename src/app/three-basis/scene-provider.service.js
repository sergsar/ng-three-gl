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
var SceneProvider = /** @class */ (function () {
    function SceneProvider() {
        this.scenes = new Map();
    }
    SceneProvider.prototype.getScene = function (id) {
        var scene = this.scenes.get(id);
        if (scene == null) {
            scene = new three_1.Scene();
            this.scenes.set(id, scene);
        }
        return scene;
    };
    SceneProvider = __decorate([
        core_1.Injectable()
    ], SceneProvider);
    return SceneProvider;
}());
exports.SceneProvider = SceneProvider;
//# sourceMappingURL=scene-provider.service.js.map