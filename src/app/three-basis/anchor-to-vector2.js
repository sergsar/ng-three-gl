"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
function anchorToVector2(value) {
    var x = Math.round(value * 0.1) - 1;
    var y = (value % 10) - 1;
    return new three_1.Vector2(x, y);
}
exports.anchorToVector2 = anchorToVector2;
//# sourceMappingURL=anchor-to-vector2.js.map