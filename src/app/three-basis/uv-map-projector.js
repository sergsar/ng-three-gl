"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var UvMapProjector = /** @class */ (function () {
    function UvMapProjector() {
    }
    UvMapProjector.prototype.face = function (geometry) {
        var vertices = geometry.vertices;
        geometry.faces.forEach(function (face) {
            var a = vertices[face.a];
            var b = vertices[face.b];
            var c = vertices[face.c];
            var ab = b.sub(a);
            var ac = c.sub(a);
            var normal = ab.cross(ac).normalize();
            var z = new three_1.Vector3(0, 0, 1);
        });
    };
    return UvMapProjector;
}());
exports.UvMapProjector = UvMapProjector;
//# sourceMappingURL=uv-map-projector.js.map