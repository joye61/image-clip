import React from "react";
import { ControllRect } from "./ControllRect";
import { ClipArea } from "./ClipArea";
import { transformValue } from "./transformValue";
import { WithOption, Rect, Point, RectState } from "./types";
import { RectContext } from "./RectState";

export class WithRect extends React.Component<WithOption, RectState> {
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
    return (
      <>
        <ClipArea
          rect={rect}
          imageUrl={this.props.imageUrl}
          editWidth={this.props.editWidth}
          editHeight={this.props.editHeight}
        />
        <ControllRect
          p1={this.state.p1}
          p2={this.state.p2}
          xmax={this.props.editWidth}
          ymax={this.props.editHeight}
          controllSize={this.props.controllSize as number}
          onChange={this.onChange}
        />
      </>
    );
  }
}
