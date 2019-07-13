import React from "react";
import { WithRect } from "./WithRect";
import { WithPoint } from "./WithPoint";
import { ClipArea } from "./ClipArea";
import { transformValue } from "./transformValue";
import { context } from "./context";

export class ClipController extends React.Component<ClipControllerOption, RectState> {
  state: RectState = {
    p1: {
      x: 0,
      y: 0
    },
    p2: {
      x: this.props.editWidth,
      y: this.props.editHeight
    }
  };

  static contextType = context;

  // 根据当前状态获取截取区域
  getRect(): Rect {
    return transformValue(this.state.p1, this.state.p2);
  }

  onChange = (rectState: RectState) => {
    this.setState({ ...rectState }, () => {
      this.props.onChange(this.getRect());
    });
  };

  componentDidMount() {
    this.props.onChange(this.getRect());
  }

  render() {
    const rect = this.getRect();
    const props = {
      p1: this.state.p1,
      p2: this.state.p2,
      xmax: this.props.editWidth,
      ymax: this.props.editHeight,
      onChange: this.onChange
    };
    let controller = null;
    if (this.context.clipType === "rect") {
      controller = <WithRect {...props} />;
    } else if (this.context.clipType === "point") {
      controller = <WithPoint {...props} />;
    }
    return (
      <>
        <ClipArea
          rect={rect}
          imageUrl={this.props.imageUrl}
          editWidth={this.props.editWidth}
          editHeight={this.props.editHeight}
        />
        {controller}
      </>
    );
  }
}
