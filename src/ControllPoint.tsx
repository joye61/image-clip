import React from "react";
import {ControllOption} from "./types";

export class ControllPoint extends React.Component<ControllOption, {}> {
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
            transform: `translate3d(${this.props.x - this.props.controllSize / 2}px, ${this
              .props.y -
              this.props.controllSize / 2}px, 0)`,
            width: `${this.props.controllSize}px`,
            height: `${this.props.controllSize}px`
          }}
          onMouseDown={this.controllDown}
        />
      </>
    );
  }
}