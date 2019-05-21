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
var transformValue_1 = require("./transformValue");
var ControllRect = (function (_super) {
    __extends(ControllRect, _super);
    function ControllRect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rect = transformValue_1.transformValue(_this.props.p1, _this.props.p2);
        _this.status = "none";
        _this.x = 0;
        _this.y = 0;
        _this.p1 = { x: 0, y: 0 };
        _this.p2 = { x: 0, y: 0 };
        _this.controllMove = function (e) {
            var currentX = e.clientX;
            var currentY = e.clientY;
            switch (_this.status) {
                case "move":
                    break;
                case "p1":
                    break;
                case "p2":
                    break;
                case "p3":
                    break;
                case "p4":
                    break;
                case "l1":
                    break;
                case "l2":
                    break;
                case "l3":
                    break;
                case "l4":
                    break;
                default:
                    break;
            }
        };
        _this.controllUp = function (e) {
            _this.status = "none";
        };
        return _this;
    }
    ControllRect.prototype.componentDidMount = function () {
        document.documentElement.addEventListener("mousemove", this.controllMove);
        document.documentElement.addEventListener("mouseup", this.controllUp);
    };
    ControllRect.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener("mousemove", this.controllMove);
        document.documentElement.removeEventListener("mouseup", this.controllUp);
    };
    ControllRect.prototype.showPoint = function () {
        var _this = this;
        var _a = this.rect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var size = this.props.controllSize;
        var points = [
            { x: x, y: y, cursor: "nwse-resize", status: "p1" },
            { x: x + width, y: y, cursor: "nesw-resize", status: "p2" },
            { x: x + width, y: y + height, cursor: "nwse-resize", status: "p3" },
            { x: x, y: y + height, cursor: "nesw-resize", status: "p4" }
        ];
        return points.map(function (p) {
            return (react_1.default.createElement("span", { key: p.status, className: "ImageClip-rect-point", style: {
                    transform: "translate3d(" + (p.x - size / 2 - 1) + "px," + (p.y - size / 2 - 1) + "px,0)",
                    width: size + "px",
                    height: size + "px",
                    cursor: p.cursor
                }, onMouseDown: function (e) {
                    e.stopPropagation();
                    if (_this.status === "none") {
                        _this.x = e.clientX;
                        _this.y = e.clientY;
                        _this.status = p.status;
                    }
                } }));
        });
    };
    ControllRect.prototype.showLine = function () {
        var _this = this;
        var _a = this.rect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var size = this.props.controllSize;
        var lines = [
            { x: x, y: y - size / 2, cursor: "ns-resize", width: width, height: size, status: "l1" },
            { x: x + width - size / 2, y: y, cursor: "ew-resize", width: size, height: height, status: "l2" },
            { x: x, y: y + height - size / 2, cursor: "ns-resize", width: width, height: size, status: "l3" },
            { x: x - size / 2, y: y, cursor: "ew-resize", width: size, height: height, status: "l4" }
        ];
        return lines.map(function (l) {
            return (react_1.default.createElement("span", { key: l.status, className: "ImageClip-rect-line", style: {
                    transform: "translate3d(" + l.x + "px," + l.y + "px,0)",
                    width: l.width + "px",
                    height: l.height + "px",
                    cursor: l.cursor
                }, onMouseDown: function (e) {
                    e.stopPropagation();
                    if (_this.status === "none") {
                        _this.x = e.clientX;
                        _this.y = e.clientY;
                        _this.status = l.status;
                    }
                } }));
        });
    };
    ControllRect.prototype.showGrid = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "ImageClip-rect-grid ImageClip-rect-grid-row" }),
            react_1.default.createElement("span", { className: "ImageClip-rect-grid ImageClip-rect-grid-col" })));
    };
    ControllRect.prototype.render = function () {
        var _this = this;
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
            this.showLine(),
            this.showGrid(),
            this.showPoint()));
    };
    return ControllRect;
}(react_1.default.Component));
exports.ControllRect = ControllRect;
