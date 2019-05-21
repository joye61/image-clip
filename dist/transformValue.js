"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformValue(p1, p2) {
    var width = Math.abs(p1.x - p2.x);
    var height = Math.abs(p1.y - p2.y);
    var x = p1.x < p2.x ? p1.x : p2.x;
    var y = p1.y < p2.y ? p1.y : p2.y;
    return { x: x, y: y, width: width, height: height };
}
exports.transformValue = transformValue;
