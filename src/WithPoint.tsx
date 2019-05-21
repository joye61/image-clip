import React from "react";
import { WithOption, WithState, Point, Rect } from "./types";

import { ControllPoint } from "./ControllPoint";
import { ClipArea } from "./ClipArea";

export class With2Points extends React.Component<WithOption, WithState> {
  state: WithState = {
    p1: {
      x: 0,
      y: 0
    },
    p2: {
      x: this.props.editWidth,
      y: this.props.editHeight
    }
  };

  getTransformValue(): Rect {
    const width = Math.abs(this.state.p1.x - this.state.p2.x);
    const height = Math.abs(this.state.p1.y - this.state.p2.y);
    const x = this.state.p1.x < this.state.p2.x ? this.state.p1.x : this.state.p2.x;
    const y = this.state.p1.y < this.state.p2.y ? this.state.p1.y : this.state.p2.y;
    return { x, y, width, height };
  }

  /**
   * 点改变位置时触发
   * @param p Point 当前点的坐标
   * @param index number 当前点的索引
   */
  onPointChange(p: Point, index: number) {
    this.setState({ [`p${index}`]: p });
  }

  showPoints() {
    const points = [this.state.p1, this.state.p2];
    return points.map((p: Point, index: number) => {
      return (
        <ControllPoint
          key={index}
          x={p.x}
          y={p.y}
          xmax={this.props.editWidth}
          ymax={this.props.editHeight}
          controllSize={this.props.controllSize as number}
          onChange={(p: Point) => this.onPointChange(p, index + 1)}
        />
      );
    });
  }

  render() {
    const rect = this.getTransformValue();
    return (
      <>
        <ClipArea
          rect={rect}
          imageUrl={this.props.imageUrl}
          editWidth={this.props.editWidth}
          editHeight={this.props.editHeight}
        />
        {this.showPoints()}
      </>
    );
  }
}
