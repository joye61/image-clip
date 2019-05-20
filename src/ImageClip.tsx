import { ImageClipOption, ImageClipState } from "./types";
import React from "react";
import {WithRect} from "./WithRect";
import {With2Points} from "./With2Points";

function getValue(value: number | string): string {
  if (typeof value === "number") {
    return value + "px";
  } else {
    return value;
  }
}

export class ImageClip extends React.Component<
  ImageClipOption,
  ImageClipState
> {
  static defaultProps = {
    containerPadding: 10,
    containerWidth: 500,
    containerHeight: 500
  };

  state: ImageClipState = {
    loaded: false
  };

  // 图片链接
  imageUrl = "";
  // 原始宽高
  originWidth = 0;
  // 原始高度
  originHeight = 0;
  // 缩放宽度
  scaleWidth = 0;
  // 缩放高度
  scaleHeight = 0;

  computeScaleSize() {
    console.log(this);
    const editorWidth =
      (this.props.containerWidth as number) -
      (this.props.containerPadding as number)*2;
    const editorHeight =
      (this.props.containerHeight as number) -
      (this.props.containerPadding as number)*2;

    if (editorWidth / editorHeight > this.originWidth / this.originHeight) {
      // 以高度为准
      const rate = this.originHeight / editorHeight;
      this.scaleHeight = editorHeight;
      this.scaleWidth = this.originWidth / rate;
    } else {
      // 以宽度为准
      const rate = this.originWidth / editorWidth;
      this.scaleWidth = editorWidth;
      this.scaleHeight = this.originHeight / rate;
    }
  }

  componentDidMount() {
    this.imageUrl = this.props.source as string;
    if (this.props.source instanceof HTMLImageElement) {
      this.imageUrl = this.props.source.src;
    }
    const img = document.createElement("img");
    img.src = this.imageUrl;
    img.onload = () => {
      this.originHeight = img.height;
      this.originWidth = img.width;
      this.computeScaleSize();
      this.setState({ loaded: true });
    };
    img.onerror = () => {
      // todo error logic
    };
  }

  render() {
    if (this.state.loaded === false) {
      return null;
    }
    return (
      <div
        className="ImageClip"
        style={{
          width: `${this.props.containerWidth}px`,
          height: `${this.props.containerHeight}px`,
          padding: `${this.props.containerPadding}px`
        }}
      >
        <div
          style={{
            width: `${this.scaleWidth}px`,
            height: `${this.scaleHeight}px`
          }}
        >
          <div className="ImageClip-bg">
            <img src={this.imageUrl} alt="" />
          </div>
          <With2Points />
        </div>
      </div>
    );
  }
}
