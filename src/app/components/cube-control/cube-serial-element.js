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
var CubeSerialElement = /** @class */ (function (_super) {
    __extends(CubeSerialElement, _super);
    function CubeSerialElement(value1, value2, height, material) {
        var _this = _super.call(this) || this;
        _this.material = material;
        var positions = [];
        var normals = [];
        var uv = [];
        var geometry = new three_1.BufferGeometry();
        var v1 = value1, v2 = value2, h = height;
        var half = new three_1.Vector3(1, 0, 1).multiplyScalar(0.5);
        // points:
        var p11 = new three_1.Vector3(v2, 0, 0).sub(half), p12 = new three_1.Vector3(v2, h, 0).sub(half), p13 = new three_1.Vector3(v1, h, 0).sub(half), p14 = new three_1.Vector3(v1, 0, 0).sub(half);
        var p21 = new three_1.Vector3(v2, 0, v2).sub(half), p22 = new three_1.Vector3(v2, h, v2).sub(half), p23 = new three_1.Vector3(v1, h, v1).sub(half);
        var p31 = new three_1.Vector3(0, 0, v2).sub(half), p32 = new three_1.Vector3(0, h, v2).sub(half), p33 = new three_1.Vector3(0, h, v1).sub(half), p34 = new three_1.Vector3(0, 0, v1).sub(half);
        // triangles and manual uv example:
        positions.push(p11.x, p11.y, p11.z, p13.x, p13.y, p13.z, p12.x, p12.y, p12.z);
        uv.push(0, 0, v2 - v1, h, 0, h);
        positions.push(p11.x, p11.y, p11.z, p14.x, p14.y, p14.z, p13.x, p13.y, p13.z);
        uv.push(0, 0, v2 - v1, 0, v2 - v1, h);
        positions.push(p11.x, p11.y, p11.z, p12.x, p12.y, p12.z, p21.x, p21.y, p21.z);
        uv.push(v2, 0, v2, h, 0, 0);
        positions.push(p12.x, p12.y, p12.z, p22.x, p22.y, p22.z, p21.x, p21.y, p21.z);
        uv.push(v2, h, 0, h, 0, 0);
        positions.push(p12.x, p12.y, p12.z, p23.x, p23.y, p23.z, p22.x, p22.y, p22.z);
        uv.push(v2, 1, v1, 1 - v1, v2, 1 - v2); //
        positions.push(p12.x, p12.y, p12.z, p13.x, p13.y, p13.z, p23.x, p23.y, p23.z);
        uv.push(v2, 1, v1, 1, v1, 1 - v1);
        positions.push(p21.x, p21.y, p21.z, p22.x, p22.y, p22.z, p31.x, p31.y, p31.z);
        uv.push(1, 0, 1, h, 0, 0);
        positions.push(p22.x, p22.y, p22.z, p32.x, p32.y, p32.z, p31.x, p31.y, p31.z);
        uv.push(1, h, 0, h, 0, 0);
        positions.push(p22.x, p22.y, p22.z, p23.x, p23.y, p23.z, p32.x, p32.y, p32.z);
        uv.push(v2, 1 - v2, v1, 1 - v1, 0, 1 - v2);
        positions.push(p23.x, p23.y, p23.z, p33.x, p33.y, p33.z, p32.x, p32.y, p32.z);
        uv.push(v1, 1 - v1, 0, 1 - v1, 0, 1 - v2);
        positions.push(p31.x, p31.y, p31.z, p33.x, p33.y, p33.z, p34.x, p34.y, p34.z);
        uv.push(v2, 0, v1, h, v1, 0);
        positions.push(p31.x, p31.y, p31.z, p32.x, p32.y, p32.z, p33.x, p33.y, p33.z);
        uv.push(v2, 0, v2, h, v1, h);
        var pA = new three_1.Vector3();
        var pB = new three_1.Vector3();
        var pC = new three_1.Vector3();
        var ba = new three_1.Vector3();
        var ca = new three_1.Vector3();
        var nx, ny, nz;
        var i = -1;
        while (i <= positions.length) {
            pA.set(positions[++i], positions[++i], positions[++i]);
            pB.set(positions[++i], positions[++i], positions[++i]);
            pC.set(positions[++i], positions[++i], positions[++i]);
            ba.subVectors(pB, pA);
            ca.subVectors(pC, pA);
            ba.cross(ca).normalize();
            nx = ba.x;
            ny = ba.y;
            nz = ba.z;
            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);
            normals.push(nx, ny, nz);
        }
        function disposeArray() { this.array = null; }
        geometry.addAttribute('position', new three_1.Float32BufferAttribute(positions, 3).onUpload(disposeArray));
        geometry.addAttribute('normal', new three_1.Float32BufferAttribute(normals, 3).onUpload(disposeArray));
        geometry.addAttribute('uv', new three_1.Float32BufferAttribute(uv, 2).onUpload(disposeArray));
        geometry.computeBoundingBox();
        _this.element = new three_1.Mesh(geometry, _this.material);
        return _this;
    }
    return CubeSerialElement;
}(cube_element_1.CubeElement));
exports.CubeSerialElement = CubeSerialElement;
//# sourceMappingURL=cube-serial-element.js.map