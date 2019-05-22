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
var transformValue_1 = require("./transformValue");
var WithPoint = (function (_super) {
    __extends(WithPoint, _super);
    function WithPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = "none";
        _this.x = 0;
        _this.y = 0;
        _this.controllMove = function (e) {
            var offsetX = e.clientX - _this.x;
            var offsetY = e.clientY - _this.y;
            var p1 = __assign({}, _this.props.p1);
            var p2 = __assign({}, _this.props.p2);
            switch (_this.status) {
                case "p1":
                    p1.x += offsetX;
                    p1.y += offsetY;
                    p1.x = transformValue_1.rangeCheck(p1.x, _this.props.xmax);
                    p1.y = transformValue_1.rangeCheck(p1.y, _this.props.ymax);
                    break;
                case "p2":
                    p2.x += offsetX;
                    p2.y += offsetY;
                    p2.x = transformValue_1.rangeCheck(p2.x, _this.props.xmax);
                    p2.y = transformValue_1.rangeCheck(p2.y, _this.props.ymax);
                    break;
                default:
                    return;
            }
            _this.x = e.clientX;
            _this.y = e.clientY;
            _this.props.onChange({ p1: p1, p2: p2 });
        };
        _this.controllUp = function () {
            _this.status = "none";
        };
        return _this;
    }
    WithPoint.prototype.componentDidMount = function () {
        document.documentElement.addEventListener("mousemove", this.controllMove);
        document.documentElement.addEventListener("mouseup", this.controllUp);
    };
    WithPoint.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener("mousemove", this.controllMove);
        document.documentElement.removeEventListener("mouseup", this.controllUp);
    };
    WithPoint.prototype.showPoint = function (p, status) {
        var _this = this;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-x", style: { transform: "translate3d(" + p.x + "px, 0, 0)" } }),
            react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-y", style: { transform: "translate3d(0, " + p.y + "px, 0)" } }),
            react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-center", style: {
                    transform: "translate3d(" + (p.x - this.props.controllSize / 2) + "px, " + (p.y -
                        this.props.controllSize / 2) + "px, 0)",
                    width: this.props.controllSize + "px",
                    height: this.props.controllSize + "px"
                }, onMouseDown: function (e) {
                    if (_this.status === "none") {
                        _this.status = status;
                        _this.x = e.clientX;
                        _this.y = e.clientY;
                    }
                } })));
    };
    WithPoint.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            this.showPoint(this.props.p1, "p1"),
            this.showPoint(this.props.p2, "p2")));
    };
    return WithPoint;
}(react_1.default.Component));
exports.WithPoint = WithPoint;
