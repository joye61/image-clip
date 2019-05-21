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
var ControllPoint_1 = require("./ControllPoint");
var ClipArea_1 = require("./ClipArea");
var With2Points = (function (_super) {
    __extends(With2Points, _super);
    function With2Points() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            p1: {
                x: 0,
                y: 0
            },
            p2: {
                x: _this.props.editWidth,
                y: _this.props.editHeight
            }
        };
        return _this;
    }
    With2Points.prototype.getTransformValue = function () {
        var width = Math.abs(this.state.p1.x - this.state.p2.x);
        var height = Math.abs(this.state.p1.y - this.state.p2.y);
        var x = this.state.p1.x < this.state.p2.x ? this.state.p1.x : this.state.p2.x;
        var y = this.state.p1.y < this.state.p2.y ? this.state.p1.y : this.state.p2.y;
        return { x: x, y: y, width: width, height: height };
    };
    With2Points.prototype.onPointChange = function (p, index) {
        var _a;
        this.setState((_a = {}, _a["p" + index] = p, _a));
    };
    With2Points.prototype.showPoints = function () {
        var _this = this;
        var points = [this.state.p1, this.state.p2];
        return points.map(function (p, index) {
            return (react_1.default.createElement(ControllPoint_1.ControllPoint, { key: index, x: p.x, y: p.y, xmax: _this.props.editWidth, ymax: _this.props.editHeight, controllSize: _this.props.controllSize, onChange: function (p) { return _this.onPointChange(p, index + 1); } }));
        });
    };
    With2Points.prototype.render = function () {
        var rect = this.getTransformValue();
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ClipArea_1.ClipArea, { rect: rect, imageUrl: this.props.imageUrl, editWidth: this.props.editWidth, editHeight: this.props.editHeight }),
            this.showPoints()));
    };
    return With2Points;
}(react_1.default.Component));
exports.With2Points = With2Points;
