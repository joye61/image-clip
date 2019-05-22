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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ControllRect_1 = require("./ControllRect");
var ClipArea_1 = require("./ClipArea");
var transformValue_1 = require("./transformValue");
var WithRect = (function (_super) {
    __extends(WithRect, _super);
    function WithRect() {
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
        _this.onChange = function (rectState) {
            _this.setState(__assign({}, rectState));
        };
        return _this;
    }
    WithRect.prototype.render = function () {
        var rect = transformValue_1.transformValue(this.state.p1, this.state.p2);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ClipArea_1.ClipArea, { rect: rect, imageUrl: this.props.imageUrl, editWidth: this.props.editWidth, editHeight: this.props.editHeight }),
            react_1.default.createElement(ControllRect_1.ControllRect, { p1: this.state.p1, p2: this.state.p2, xmax: this.props.editWidth, ymax: this.props.editHeight, controllSize: this.props.controllSize, onChange: this.onChange })));
    };
    return WithRect;
}(react_1.default.Component));
exports.WithRect = WithRect;
