import React from "react";
import { ControllRectOption, Point } from "./types";
import { transformValue } from "./transformValue";

export class ControllRect extends React.Component<ControllRectOption, {}> {
  rect = transformValue(this.props.p1, this.props.p2);

  status: "none" | "p1" | "p2" | "p3" | "p4" | "l1" | "l2" | "l3" | "l4" | "move" = "none";
  x = 0;
  y = 0;
  p1: Point = { x: 0, y: 0 };
  p2: Point = { x: 0, y: 0 };

  controllMove = (e: MouseEvent) => {
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    switch (this.status) {
      case "move":
        break;
      case "p1":
        // let p1 = {
        //   x: 
        // }
        break;
      case "p2":
        break;
      case "p3":
        break;
      case "p4":
        break;
      case "l1":
        break;
      case "l2":
        break;
      case "l3":
        break;
      case "l4":
        break;
      default:
        break;
    }
  };

  controllUp = (e: MouseEvent) => {
    // 状态初始化
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

  showPoint() {
    const { x, y, width, height } = this.rect;
    const size = this.props.controllSize;
    // 顺时针方向4个点坐标
    const points = [
      { x: x, y: y, cursor: "nwse-resize", status: "p1" }, // 左上角
      { x: x + width, y, cursor: "nesw-resize", status: "p2" }, // 右上角
      { x: x + width, y: y + height, cursor: "nwse-resize", status: "p3" }, // 右下角
      { x, y: y + height, cursor: "nesw-resize", status: "p4" } // 左下角
    ];

    return points.map(p => {
      return (
        <span
          key={p.status}
          className={`ImageClip-rect-point`}
          style={{
            transform: `translate3d(${p.x - size / 2 - 1}px,${p.y - size / 2 - 1}px,0)`,
            width: `${size}px`,
            height: `${size}px`,
            cursor: p.cursor
          }}
          onMouseDown={e => {
            e.stopPropagation();
            if (this.status === "none") {
              this.x = e.clientX;
              this.y = e.clientY;
              this.status = p.status as any;
            }
          }}
        />
      );
    });
  }

  showLine() {
    const { x, y, width, height } = this.rect;
    const size = this.props.controllSize;
    // 顺时针方向4条边
    const lines = [
      { x, y: y - size / 2, cursor: "ns-resize", width, height: size, status: "l1" }, // 上边
      { x: x + width - size / 2, y, cursor: "ew-resize", width: size, height, status: "l2" }, // 右边
      { x, y: y + height - size / 2, cursor: "ns-resize", width, height: size, status: "l3" }, // 下边
      { x: x - size / 2, y, cursor: "ew-resize", width: size, height, status: "l4" } // 左边
    ];

    return lines.map(l => {
      return (
        <span
          key={l.status}
          className={`ImageClip-rect-line`}
          style={{
            transform: `translate3d(${l.x}px,${l.y}px,0)`,
            width: `${l.width}px`,
            height: `${l.height}px`,
            cursor: l.cursor
          }}
          onMouseDown={e => {
            e.stopPropagation();
            if (this.status === "none") {
              this.x = e.clientX;
              this.y = e.clientY;
              this.status = l.status as any;
            }
          }}
        />
      );
    });
  }

  showGrid() {
    return (
      <>
        <span className="ImageClip-rect-grid ImageClip-rect-grid-row" />
        <span className="ImageClip-rect-grid ImageClip-rect-grid-col" />
      </>
    );
  }

  render() {
    return (
      <div
        className="ImageClip-rect"
        style={{
          transform: `translate3d(${this.rect.x}px,${this.rect.y}px,0)`,
          width: `${this.rect.width}px`,
          height: `${this.rect.height}px`
        }}
        onMouseDown={e => {
          e.stopPropagation();
          if (this.status === "none") {
            this.x = e.clientX;
            this.y = e.clientY;
            this.status = "move";
          }
        }}
      >
        {this.showLine()}
        {this.showGrid()}
        {this.showPoint()}
      </div>
    );
  }
}
