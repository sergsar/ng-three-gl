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
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var cube_element_1 = require("./cube-element");
var CubeFirstElement = /** @class */ (function (_super) {
    __extends(CubeFirstElement, _super);
    function CubeFirstElement(value, height, material) {
        var _this = _super.call(this) || this;
        _this.material = material;
        var boxGeometry = new three_1.BoxGeometry(value, height, value);
        boxGeometry.vertices.forEach(function (p) { return console.log(p); });
        // boxGeometry.faceVertexUvs.forEach(p => {
        //     p.forEach(p1 => {
        //         p1.forEach(p2 => p2.x = 2)
        //         console.log(p1);
        //     });
        // });
        var element = new three_1.Mesh(boxGeometry, _this.material);
        element.translateOnAxis(new three_1.Vector3(value - 1, height, value - 1).multiplyScalar(0.5), 1);
        _this.element = element;
        return _this;
    }
    return CubeFirstElement;
}(cube_element_1.CubeElement));
exports.CubeFirstElement = CubeFirstElement;
//# sourceMappingURL=cube-first-element.js.map