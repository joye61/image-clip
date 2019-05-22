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
var WithRect_1 = require("./WithRect");
var WithPoint_1 = require("./WithPoint");
var ClipArea_1 = require("./ClipArea");
var transformValue_1 = require("./transformValue");
var ClipController = (function (_super) {
    __extends(ClipController, _super);
    function ClipController() {
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
    ClipController.prototype.render = function () {
        var rect = transformValue_1.transformValue(this.state.p1, this.state.p2);
        var props = {
            p1: this.state.p1,
            p2: this.state.p2,
            xmax: this.props.editWidth,
            ymax: this.props.editHeight,
            controllSize: this.props.controllSize,
            onChange: this.onChange
        };
        var controller = null;
        if (this.props.type === "rect") {
            controller = react_1.default.createElement(WithRect_1.WithRect, __assign({}, props));
        }
        else if (this.props.type === "point") {
            controller = react_1.default.createElement(WithPoint_1.WithPoint, __assign({}, props));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ClipArea_1.ClipArea, { rect: rect, imageUrl: this.props.imageUrl, editWidth: this.props.editWidth, editHeight: this.props.editHeight }),
            controller));
    };
    return ClipController;
}(react_1.default.Component));
exports.ClipController = ClipController;
