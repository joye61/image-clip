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
var WithRect = (function (_super) {
    __extends(WithRect, _super);
    function WithRect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        _this.status = "none";
        _this.x = 0;
        _this.y = 0;
        _this.controllMove = function (e) {
            var offsetX = e.clientX - _this.x;
            var offsetY = e.clientY - _this.y;
            var p1 = __assign({}, _this.props.p1);
            var p2 = __assign({}, _this.props.p2);
            switch (_this.status) {
                case "move":
                    p1.x += offsetX;
                    p1.y += offsetY;
                    var xmax = _this.props.xmax - _this.rect.width;
                    var ymax = _this.props.ymax - _this.rect.height;
                    p1.x = p1.x < 0 ? 0 : p1.x;
                    p1.x = p1.x > xmax ? xmax : p1.x;
                    p1.y = p1.y < 0 ? 0 : p1.y;
                    p1.y = p1.y > ymax ? ymax : p1.y;
                    p2.x = p1.x + _this.rect.width;
                    p2.y = p1.y + _this.rect.height;
                    break;
                case "lt":
                    p1.x += offsetX;
                    p1.y += offsetY;
                    p1.x = transformValue_1.rangeCheck(p1.x, _this.props.xmax);
                    p1.y = transformValue_1.rangeCheck(p1.y, _this.props.ymax);
                    break;
                case "rt":
                    p1.y += offsetY;
                    p2.x += offsetX;
                    p1.y = transformValue_1.rangeCheck(p1.y, _this.props.ymax);
                    p2.x = transformValue_1.rangeCheck(p2.x, _this.props.xmax);
                    break;
                case "rb":
                    p2.x += offsetX;
                    p2.y += offsetY;
                    p2.x = transformValue_1.rangeCheck(p2.x, _this.props.xmax);
                    p2.y = transformValue_1.rangeCheck(p2.y, _this.props.ymax);
                    break;
                case "lb":
                    p1.x += offsetX;
                    p2.y += offsetY;
                    p1.x = transformValue_1.rangeCheck(p1.x, _this.props.xmax);
                    p2.y = transformValue_1.rangeCheck(p2.y, _this.props.ymax);
                    break;
                case "t":
                    p1.y += offsetY;
                    p1.y = transformValue_1.rangeCheck(p1.y, _this.props.ymax);
                    break;
                case "r":
                    p2.x += offsetX;
                    p2.x = transformValue_1.rangeCheck(p2.x, _this.props.xmax);
                    break;
                case "b":
                    p2.y += offsetY;
                    p2.y = transformValue_1.rangeCheck(p2.y, _this.props.ymax);
                    break;
                case "l":
                    p1.x += offsetX;
                    p1.x = transformValue_1.rangeCheck(p1.x, _this.props.xmax);
                    break;
                default:
                    return;
            }
            _this.props.onChange({ p1: p1, p2: p2 });
            _this.x = e.clientX;
            _this.y = e.clientY;
        };
        _this.controllUp = function (e) {
            _this.status = "none";
            var rect = transformValue_1.transformValue(_this.props.p1, _this.props.p2);
            _this.props.onChange({
                p1: { x: rect.x, y: rect.y },
                p2: { x: rect.x + rect.width, y: rect.y + rect.height }
            });
        };
        return _this;
    }
    WithRect.prototype.componentDidMount = function () {
        document.documentElement.addEventListener("mousemove", this.controllMove);
        document.documentElement.addEventListener("mouseup", this.controllUp);
    };
    WithRect.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener("mousemove", this.controllMove);
        document.documentElement.removeEventListener("mouseup", this.controllUp);
    };
    WithRect.prototype.showPoint = function () {
        var _this = this;
        var offsetPx = -this.props.controllSize / 2 - 1 + "px";
        var points = [
            { left: offsetPx, top: offsetPx, cursor: "nwse-resize", status: "lt" },
            { right: offsetPx, top: offsetPx, cursor: "nesw-resize", status: "rt" },
            { right: offsetPx, bottom: offsetPx, cursor: "nwse-resize", status: "rb" },
            { left: offsetPx, bottom: offsetPx, cursor: "nesw-resize", status: "lb" }
        ];
        return points.map(function (item) {
            var pointStyle = __assign({ width: _this.props.controllSize + "px", height: _this.props.controllSize + "px" }, item);
            delete pointStyle.status;
            return (react_1.default.createElement("span", { key: item.status, className: "ImageClip-rect-point", style: pointStyle, onMouseDown: function (e) {
                    e.stopPropagation();
                    if (_this.status === "none") {
                        _this.x = e.clientX;
                        _this.y = e.clientY;
                        _this.status = item.status;
                    }
                } }));
        });
    };
    WithRect.prototype.showLine = function () {
        var _this = this;
        var offsetPx = -this.props.controllSize / 2 - 1 + "px";
        var lines = [
            {
                left: 0,
                top: offsetPx,
                cursor: "ns-resize",
                width: "100%",
                height: this.props.controllSize,
                status: "t"
            },
            {
                top: 0,
                right: offsetPx,
                cursor: "ew-resize",
                width: this.props.controllSize,
                height: "100%",
                status: "r"
            },
            {
                left: 0,
                bottom: offsetPx,
                cursor: "ns-resize",
                width: "100%",
                height: this.props.controllSize,
                status: "b"
            },
            {
                top: 0,
                left: offsetPx,
                cursor: "ew-resize",
                height: "100%",
                width: this.props.controllSize,
                status: "l"
            }
        ];
        return lines.map(function (item) {
            var lineStyle = __assign({}, item);
            delete lineStyle.status;
            return (react_1.default.createElement("span", { key: item.status, className: "ImageClip-rect-line", style: lineStyle, onMouseDown: function (e) {
                    e.stopPropagation();
                    if (_this.status === "none") {
                        _this.x = e.clientX;
                        _this.y = e.clientY;
                        _this.status = item.status;
                    }
                } }));
        });
    };
    WithRect.prototype.render = function () {
        var _this = this;
        this.rect = transformValue_1.transformValue(this.props.p1, this.props.p2);
        return (react_1.default.createElement("div", { className: "ImageClip-rect", style: {
                transform: "translate3d(" + this.rect.x + "px," + this.rect.y + "px,0)",
                width: this.rect.width + "px",
                height: this.rect.height + "px"
            }, onMouseDown: function (e) {
                e.stopPropagation();
                if (_this.status === "none") {
                    _this.x = e.clientX;
                    _this.y = e.clientY;
                    _this.status = "move";
                }
            } },
            react_1.default.createElement("span", { className: "ImageClip-rect-grid-row" }),
            react_1.default.createElement("span", { className: "ImageClip-rect-grid-col" }),
            this.showLine(),
            this.showPoint()));
    };
    return WithRect;
}(react_1.default.Component));
exports.WithRect = WithRect;
