export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ChangeResult {
  src: string;
  imageWidth: number;
  imageHeight: number;
  rect: Rect;
}

export type ClipType = "rect" | "point";
export type PointType = "rounded" | "square";

export interface ImageClipOption {
  // 图片的来源，可以是链接或图片元素
  source: string | HTMLImageElement;
  onChange?: (res: ChangeResult) => void;
  // 可裁剪区域距离容器的padding
  containerPadding?: number;
  // 容器的尺寸
  containerWidth?: number;
  containerHeight?: number;

  // 可控制点或线的尺寸
  controllSize?: number;
  // 裁剪框的类型
  clipType?: ClipType;
  // 控制点的类型
  pointType?: PointType;
}

export interface ImageClipState {
  loaded: boolean;
}

export interface ClipControllerOption {
  editWidth: number;
  editHeight: number;
  imageUrl: string;
  onChange: (rect: Rect) => void;
}

// 点的坐标
export interface Point {
  x: number;
  y: number;
}

// 两个虚拟对角点的坐标
export interface RectState {
  p1: Point;
  p2: Point;
}

export interface WithOption{
  // p1和p2代表对角线的2两个点
  p1: Point;
  p2: Point;
  // xmax和ymax代表最大可编辑范围
  xmax: number;
  ymax: number;
  // 控制点或线的尺寸
  onChange: (rectState: RectState) => void;
}
