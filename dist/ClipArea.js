"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function ClipArea(props) {
    return (react_1.default.createElement("div", { className: "ImageClip-area", style: {
            transform: "translate3d(" + props.rect.x + "px, " + props.rect.y + "px, 0)",
            width: props.rect.width + "px",
            height: props.rect.height + "px"
        } },
        react_1.default.createElement("img", { src: props.imageUrl, alt: "", draggable: false, style: {
                transform: "translate3d(-" + props.rect.x + "px, -" + props.rect.y + "px, 0)",
                width: props.editWidth + "px",
                height: props.editHeight + "px"
            } })));
}
exports.ClipArea = ClipArea;
