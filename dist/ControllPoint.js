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
var ControllPoint = (function (_super) {
    __extends(ControllPoint, _super);
    function ControllPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isControll = false;
        _this.x = 0;
        _this.y = 0;
        _this.controllMove = function (e) {
            if (_this.isControll) {
                var currentX = e.clientX;
                var currentY = e.clientY;
                var x = _this.props.x + currentX - _this.x;
                var y = _this.props.y + currentY - _this.y;
                x = x < 0 ? 0 : x;
                x = x > _this.props.xmax ? _this.props.xmax : x;
                y = y < 0 ? 0 : y;
                y = y > _this.props.ymax ? _this.props.ymax : y;
                _this.props.onChange({ x: x, y: y });
                _this.x = currentX;
                _this.y = currentY;
            }
        };
        _this.controllUp = function (e) {
            _this.isControll = false;
        };
        _this.controllDown = function (e) {
            if (!_this.isControll) {
                _this.isControll = true;
                _this.x = e.clientX;
                _this.y = e.clientY;
            }
        };
        return _this;
    }
    ControllPoint.prototype.componentDidMount = function () {
        document.documentElement.addEventListener("mousemove", this.controllMove);
        document.documentElement.addEventListener("mouseup", this.controllUp);
    };
    ControllPoint.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener("mousemove", this.controllMove);
        document.documentElement.removeEventListener("mouseup", this.controllUp);
    };
    ControllPoint.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-x", style: { transform: "translate3d(" + this.props.x + "px, 0, 0)" } }),
            react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-y", style: { transform: "translate3d(0, " + this.props.y + "px, 0)" } }),
            react_1.default.createElement("span", { className: "ImageEditor-2p ImageEditor-2p-center", style: {
                    transform: "translate3d(" + (this.props.x - this.props.controllSize / 2) + "px, " + (this
                        .props.y -
                        this.props.controllSize / 2) + "px, 0)",
                    width: this.props.controllSize + "px",
                    height: this.props.controllSize + "px"
                }, onMouseDown: this.controllDown })));
    };
    return ControllPoint;
}(react_1.default.Component));
exports.ControllPoint = ControllPoint;
