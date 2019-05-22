import React from "react";
import { WithOption, Point } from "./types";
import { rangeCheck } from "./transformValue";

type MoveStatus = "p1" | "p2" | "none";

export class WithPoint extends React.Component<WithOption, {}> {
  status: MoveStatus = "none";
  x = 0;
  y = 0;

  controllMove = (e: MouseEvent) => {
    // 指针偏移
    const offsetX = e.clientX - this.x;
    const offsetY = e.clientY - this.y;

    const p1 = { ...this.props.p1 };
    const p2 = { ...this.props.p2 };

    switch (this.status) {
      case "p1":
        p1.x += offsetX;
        p1.y += offsetY;
        p1.x = rangeCheck(p1.x, this.props.xmax);
        p1.y = rangeCheck(p1.y, this.props.ymax);
        break;
      case "p2":
        p2.x += offsetX;
        p2.y += offsetY;
        p2.x = rangeCheck(p2.x, this.props.xmax);
        p2.y = rangeCheck(p2.y, this.props.ymax);
        break;
      default:
        return;
    }

    this.x = e.clientX;
    this.y = e.clientY;
    this.props.onChange({ p1, p2 });
  };

  controllUp = () => {
    this.status = "none";
  };

  componentDidMount() {
    document.documentElement.addEventListener("mousemove", this.controllMove);
    document.documentElement.addEventListener("mouseup", this.controllUp);
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener("mousemove", this.controllMove);
    document.documentElement.removeEventListener("mouseup", this.controllUp);
  }

  showPoint(p: Point, status: MoveStatus) {
    return (
      <>
        <span
          className="ImageEditor-2p ImageEditor-2p-x"
          style={{ transform: `translate3d(${p.x}px, 0, 0)` }}
        />
        <span
          className="ImageEditor-2p ImageEditor-2p-y"
          style={{ transform: `translate3d(0, ${p.y}px, 0)` }}
        />
        <span
          className="ImageEditor-2p ImageEditor-2p-center"
          style={{
            transform: `translate3d(${p.x - this.props.controllSize / 2}px, ${p.y -
              this.props.controllSize / 2}px, 0)`,
            width: `${this.props.controllSize}px`,
            height: `${this.props.controllSize}px`
          }}
          onMouseDown={e => {
            if (this.status === "none") {
              this.status = status;
              this.x = e.clientX;
              this.y = e.clientY;
            }
          }}
        />
      </>
    );
  }

  render() {
    return (
      <>
        {this.showPoint(this.props.p1, "p1")}
        {this.showPoint(this.props.p2, "p2")}
      </>
    );
  }
}
