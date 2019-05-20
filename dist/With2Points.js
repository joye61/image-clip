"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function ControllPoint(_a) {
    var x = _a.x, y = _a.y, size = _a.size;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-x", style: { left: x + "px" } }),
        react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-y", style: { top: y + "px" } }),
        react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-center", style: {
                top: y - size / 2 + "px",
                left: x - size / 2 + "px",
                width: size + "px",
                height: size + "px"
            } })));
}
var With2Points = (function (_super) {
    __extends(With2Points, _super);
    function With2Points() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    With2Points.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ControllPoint, { x: 32, y: 99, size: 10 }),
            react_1.default.createElement(ControllPoint, { x: 324, y: 240, size: 10 })));
    };
    return With2Points;
}(react_1.default.Component));
exports.With2Points = With2Points;
