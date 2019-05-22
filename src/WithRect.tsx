import React from "react";
import { WithOption, Rect } from "./types";
import { transformValue, rangeCheck } from "./transformValue";

type ControllStatus =
  | "none" // 非控制状态
  | "lt" // 左上角
  | "rt" // 右上角
  | "rb" // 右下角
  | "lb" // 左下角
  | "t" // 上边
  | "r" // 右边
  | "b" // 下边
  | "l" // 左边
  | "move"; // 中间

export class WithRect extends React.Component<WithOption, {}> {
  // 截取框的准确信息
  rect: Rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  // 当前的拖拽状态
  status: ControllStatus = "none";

  // 指针的位置
  x = 0;
  y = 0;

  controllMove = (e: MouseEvent) => {
    // 指针偏移
    const offsetX = e.clientX - this.x;
    const offsetY = e.clientY - this.y;

    // 临时的点
    const p1 = { ...this.props.p1 };
    const p2 = { ...this.props.p2 };

    switch (this.status) {
      case "move":
        p1.x += offsetX;
        p1.y += offsetY;
        // 整体移动时，p1或p2的移动范围是固定的，计算出范围即可
        const xmax = this.props.xmax - this.rect.width;
        const ymax = this.props.ymax - this.rect.height;
        p1.x = p1.x < 0 ? 0 : p1.x;
        p1.x = p1.x > xmax ? xmax : p1.x;
        p1.y = p1.y < 0 ? 0 : p1.y;
        p1.y = p1.y > ymax ? ymax : p1.y;
        p2.x = p1.x + this.rect.width;
        p2.y = p1.y + this.rect.height;
        break;
      case "lt":
        // p1动，p2 不动
        p1.x += offsetX;
        p1.y += offsetY;
        p1.x = rangeCheck(p1.x, this.props.xmax);
        p1.y = rangeCheck(p1.y, this.props.ymax);
        break;
      case "rt":
        // p1动y，p2动x
        p1.y += offsetY;
        p2.x += offsetX;
        p1.y = rangeCheck(p1.y, this.props.ymax);
        p2.x = rangeCheck(p2.x, this.props.xmax);
        break;
      case "rb":
        // p1不动，p2动
        p2.x += offsetX;
        p2.y += offsetY;
        p2.x = rangeCheck(p2.x, this.props.xmax);
        p2.y = rangeCheck(p2.y, this.props.ymax);
        break;
      case "lb":
        // p1动x，p2动y
        p1.x += offsetX;
        p2.y += offsetY;
        p1.x = rangeCheck(p1.x, this.props.xmax);
        p2.y = rangeCheck(p2.y, this.props.ymax);
        break;
      case "t":
        // p1动y
        p1.y += offsetY;
        p1.y = rangeCheck(p1.y, this.props.ymax);
        break;
      case "r":
        // p2动x
        p2.x += offsetX;
        p2.x = rangeCheck(p2.x, this.props.xmax);
        break;
      case "b":
        // p2动y
        p2.y += offsetY;
        p2.y = rangeCheck(p2.y, this.props.ymax);
        break;
      case "l":
        // p1动x
        p1.x += offsetX;
        p1.x = rangeCheck(p1.x, this.props.xmax);
        break;
      default:
        return;
    }

    this.props.onChange({ p1, p2 });
    // 指针的位置置为新坐标
    this.x = e.clientX;
    this.y = e.clientY;
  };

  controllUp = (e: MouseEvent) => {
    // 状态初始化
    this.status = "none";
    // p1和p2初始化，为下一次控制做准备
    const rect = transformValue(this.props.p1, this.props.p2);
    this.props.onChange({
      p1: { x: rect.x, y: rect.y },
      p2: { x: rect.x + rect.width, y: rect.y + rect.height }
    });
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
    // 顺时针方向4个点坐标
    const offsetPx = `${-this.props.controllSize / 2 - 1}px`;
    const points = [
      { left: offsetPx, top: offsetPx, cursor: "nwse-resize", status: "lt" }, // 左上角
      { right: offsetPx, top: offsetPx, cursor: "nesw-resize", status: "rt" }, // 右上角
      { right: offsetPx, bottom: offsetPx, cursor: "nwse-resize", status: "rb" }, // 右下角
      { left: offsetPx, bottom: offsetPx, cursor: "nesw-resize", status: "lb" } // 左下角
    ];

    return points.map(item => {
      const pointStyle = {
        width: `${this.props.controllSize}px`,
        height: `${this.props.controllSize}px`,
        ...item
      };
      delete pointStyle.status;

      return (
        <span
          key={item.status}
          className="ImageClip-rect-point"
          style={pointStyle}
          onMouseDown={e => {
            e.stopPropagation();
            if (this.status === "none") {
              this.x = e.clientX;
              this.y = e.clientY;
              this.status = item.status as any;
            }
          }}
        />
      );
    });
  }

  showLine() {
    // 顺时针方向4条边
    const offsetPx = `${-this.props.controllSize / 2 - 1}px`;
    const lines = [
      {
        left: 0,
        top: offsetPx,
        cursor: "ns-resize",
        width: "100%",
        height: this.props.controllSize,
        status: "t"
      }, // 上边
      {
        top: 0,
        right: offsetPx,
        cursor: "ew-resize",
        width: this.props.controllSize,
        height: "100%",
        status: "r"
      }, // 右边
      {
        left: 0,
        bottom: offsetPx,
        cursor: "ns-resize",
        width: "100%",
        height: this.props.controllSize,
        status: "b"
      }, // 下边
      {
        top: 0,
        left: offsetPx,
        cursor: "ew-resize",
        height: "100%",
        width: this.props.controllSize,
        status: "l"
      } // 左边
    ];

    return lines.map(item => {
      const lineStyle = { ...item };
      delete lineStyle.status;
      return (
        <span
          key={item.status}
          className="ImageClip-rect-line"
          style={lineStyle}
          onMouseDown={e => {
            e.stopPropagation();
            if (this.status === "none") {
              this.x = e.clientX;
              this.y = e.clientY;
              this.status = item.status as any;
            }
          }}
        />
      );
    });
  }

  render() {
    this.rect = transformValue(this.props.p1, this.props.p2);

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
        <span className="ImageClip-rect-grid-row" />
        <span className="ImageClip-rect-grid-col" />
        {this.showLine()}
        {this.showPoint()}
      </div>
    );
  }
}
