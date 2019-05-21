import React from "react";
import {
  With2PointsEditOption,
  With2PointsEditState,
  ControllPointOption,
  Point,
  Rect
} from "./types";

class ControllPoint extends React.Component<ControllPointOption, {}> {
  isControll = false;
  x = 0;
  y = 0;

  controllMove = (e: MouseEvent) => {
    if (this.isControll) {
      const currentX = e.clientX;
      const currentY = e.clientY;

      let x = this.props.x + currentX - this.x;
      let y = this.props.y + currentY - this.y;

      x = x < 0 ? 0 : x;
      x = x > this.props.xmax ? this.props.xmax : x;
      y = y < 0 ? 0 : y;
      y = y > this.props.ymax ? this.props.ymax : y;

      this.props.onChange({ x, y });
      this.x = currentX;
      this.y = currentY;
    }
  };

  controllUp = (e: MouseEvent) => {
    this.isControll = false;
  };

  controllDown = (e: React.MouseEvent) => {
    if (!this.isControll) {
      this.isControll = true;
      this.x = e.clientX;
      this.y = e.clientY;
    }
  };

  componentDidMount() {
    document.documentElement.addEventListener("mousemove", this.controllMove);
    document.documentElement.addEventListener("mouseup", this.controllUp);
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener("mousemove", this.controllMove);
    document.documentElement.removeEventListener("mouseup", this.controllUp);
  }

  render() {
    return (
      <>
        <span
          className="ImageEditor-2p ImageEditor-2p-x"
          style={{ transform: `translate3d(${this.props.x}px, 0, 0)` }}
        />
        <span
          className="ImageEditor-2p ImageEditor-2p-y"
          style={{ transform: `translate3d(0, ${this.props.y}px, 0)` }}
        />
        <span
          className="ImageEditor-2p ImageEditor-2p-center"
          style={{
            transform: `translate3d(${this.props.x - this.props.controllPointSize / 2}px, ${this
              .props.y -
              this.props.controllPointSize / 2}px, 0)`,
            width: `${this.props.controllPointSize}px`,
            height: `${this.props.controllPointSize}px`
          }}
          onMouseDown={this.controllDown}
        />
      </>
    );
  }
}

export class With2Points extends React.Component<With2PointsEditOption, With2PointsEditState> {
  state: With2PointsEditState = {
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
          controllPointSize={this.props.controllPointSize as number}
          onChange={(p: Point) => this.onPointChange(p, index + 1)}
        />
      );
    });
  }

  render() {
    const rect = this.getTransformValue();
    return (
      <>
        <div
          className="ImageClip-2p-area"
          style={{
            transform: `translate3d(${rect.x}px, ${rect.y}px, 0)`,
            width: `${rect.width}px`,
            height: `${rect.height}px`
          }}
        >
          <img
            src={this.props.imageUrl}
            alt=""
            draggable={false}
            style={{
              transform: `translate3d(-${rect.x}px, -${rect.y}px, 0)`,
              width: `${this.props.editWidth}px`,
              height: `${this.props.editHeight}px`
            }}
          />
        </div>
        {this.showPoints()}
      </>
    );
  }
}
