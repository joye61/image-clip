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
function getValue(value) {
    if (typeof value === "number") {
        return value + "px";
    }
    else {
        return value;
    }
}
var ImageClip = (function (_super) {
    __extends(ImageClip, _super);
    function ImageClip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loaded: false
        };
        _this.imageUrl = "";
        _this.originWidth = 0;
        _this.originHeight = 0;
        _this.scaleWidth = 0;
        _this.scaleHeight = 0;
        return _this;
    }
    ImageClip.prototype.computeScaleSize = function () {
        console.log(this);
        var editorWidth = this.props.containerWidth -
            this.props.containerPadding * 2;
        var editorHeight = this.props.containerHeight -
            this.props.containerPadding * 2;
        if (editorWidth / editorHeight > this.originWidth / this.originHeight) {
            var rate = this.originHeight / editorHeight;
            this.scaleHeight = editorHeight;
            this.scaleWidth = this.originWidth / rate;
        }
        else {
            var rate = this.originWidth / editorWidth;
            this.scaleWidth = editorWidth;
            this.scaleHeight = this.originHeight / rate;
        }
    };
    ImageClip.prototype.componentDidMount = function () {
        var _this = this;
        this.imageUrl = this.props.source;
        if (this.props.source instanceof HTMLImageElement) {
            this.imageUrl = this.props.source.src;
        }
        var img = document.createElement("img");
        img.src = this.imageUrl;
        img.onload = function () {
            _this.originHeight = img.height;
            _this.originWidth = img.width;
            _this.computeScaleSize();
            _this.setState({ loaded: true });
        };
        img.onerror = function () {
        };
    };
    ImageClip.prototype.render = function () {
        if (this.state.loaded === false) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "ImageClip", style: {
                width: this.props.containerWidth + "px",
                height: this.props.containerHeight + "px",
                padding: this.props.containerPadding + "px"
            } },
            react_1.default.createElement("div", { style: {
                    width: this.scaleWidth + "px",
                    height: this.scaleHeight + "px"
                } },
                react_1.default.createElement("div", { className: "ImageClip-bg" },
                    react_1.default.createElement("img", { src: this.imageUrl, alt: "" })))));
    };
    ImageClip.defaultProps = {
        containerPadding: 10,
        containerWidth: 500,
        containerHeight: 500
    };
    return ImageClip;
}(react_1.default.Component));
exports.ImageClip = ImageClip;
