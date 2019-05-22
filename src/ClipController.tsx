import React from "react";
import { WithRect } from "./WithRect";
import { WithPoint } from "./WithPoint";
import { ClipArea } from "./ClipArea";
import { transformValue } from "./transformValue";
import { ClipControllerOption, RectState } from "./types";

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

  onChange = (rectState: RectState) => {
    this.setState({ ...rectState });
  };

  render() {
    const rect = transformValue(this.state.p1, this.state.p2);
    const props = {
      p1: this.state.p1,
      p2: this.state.p2,
      xmax: this.props.editWidth,
      ymax: this.props.editHeight,
      controllSize: this.props.controllSize,
      onChange: this.onChange
    };
    let controller = null;
    if (this.props.type === "rect") {
      controller = <WithRect {...props} />;
    } else if (this.props.type === "point") {
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
