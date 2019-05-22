export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ChangeResult {
  imageWidth: number;
  imageHeight: number;
  rect: Rect;
}

export type ClipType = "rect" | "point";

export interface ImageClipOption {
  source: string | HTMLImageElement;
  onChange?: (res: ChangeResult) => void;
  containerPadding?: number;
  containerWidth?: number;
  containerHeight?: number;
  // 可控制点或线的尺寸
  controllSize?: number;
  // 裁剪框的类型
  type?: ClipType;
}

export interface ImageClipState {
  loaded: boolean;
}

export interface ClipControllerOption {
  editWidth: number;
  editHeight: number;
  controllSize: number;
  imageUrl: string;
  type: ClipType; 
  onChange?: () => void;
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

export interface ControllOption {
  x: number;
  y: number;
  xmax: number;
  ymax: number;
  controllSize: number;
  onChange: (p: Point) => void;
}

export interface WithOption{
  // p1和p2代表对角线的2两个点
  p1: Point;
  p2: Point;
  // xmax和ymax代表最大可编辑范围
  xmax: number;
  ymax: number;
  // 控制点或线的尺寸
  controllSize: number;
  onChange: (rectState: RectState) => void;
}
