import React from "react";
import { ClipController } from "./ClipController";
import { context } from "./context";

export class ImageClip extends React.Component<ImageClipOption, ImageClipState> {
  static defaultProps = {
    containerPadding: 10,
    containerWidth: 500,
    containerHeight: 500
  };

  static contextType = context;

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
  // 缩放比率
  scale = 1;

  computeScaleSize() {
    const editorWidth =
      (this.props.containerWidth as number) - (this.props.containerPadding as number) * 2;
    const editorHeight =
      (this.props.containerHeight as number) - (this.props.containerPadding as number) * 2;

    if (editorWidth / editorHeight > this.originWidth / this.originHeight) {
      // 以高度为准
      this.scale = this.originHeight / editorHeight;
      this.scaleHeight = editorHeight;
      this.scaleWidth = this.originWidth / this.scale;
    } else {
      // 以宽度为准
      this.scale = this.originWidth / editorWidth;
      this.scaleWidth = editorWidth;
      this.scaleHeight = this.originHeight / this.scale;
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

  constructor(props: ImageClipOption) {
    super(props);
    console.log(111, this.context);
  }

  render() {
    // 图片未加载完成之前不显示编辑器框
    if (this.state.loaded === false) {
      return null;
    }

    this.context.controllSize = this.props.controllSize || this.context.controllSize;
    this.context.clipType = this.props.clipType || this.context.clipType;
    this.context.pointType = this.props.pointType || this.context.pointType;

    // 图片加载完成之后显示编辑器框
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
            <img src={this.imageUrl} alt="" draggable={false} />
          </div>
          <ClipController
            editWidth={this.scaleWidth}
            editHeight={this.scaleHeight}
            imageUrl={this.imageUrl}
            onChange={(rect: Rect) => {
              if (this.props.onChange && typeof this.props.onChange === "function") {
                this.props.onChange({
                  imageWidth: this.originWidth,
                  imageHeight: this.originHeight,
                  src: this.imageUrl,
                  rect: {
                    x: rect.x * this.scale,
                    y: rect.y * this.scale,
                    width: rect.width * this.scale,
                    height: rect.height * this.scale
                  }
                });
              }
            }}
          />
        </div>
      </div>
    );
  }
}
