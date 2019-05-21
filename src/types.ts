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

export interface ImageClipOption {
  source: string | HTMLImageElement;
  onChange?: (res: ChangeResult) => void;
  containerPadding?: number;
  containerWidth?: number;
  containerHeight?: number;
  // 可控制点或线的尺寸
  controllSize?: number;
}

export interface ImageClipState {
  loaded: boolean;
}

export interface WithOption {
  editWidth: number;
  editHeight: number;
  controllSize: number;
  imageUrl: string;
  onChange?: () => void;
}

export interface Point {
  x: number;
  y: number;
}

export interface WithState {
  p1: Point;
  p2: Point;
  [key: string]: Point;
}

export interface ControllOption {
  x: number;
  y: number;
  xmax: number;
  ymax: number;
  controllSize: number;
  onChange: (p: Point) => void;
}

export interface ControllRectOption{
  // p1和p2代表对角线的2两个点
  p1: Point;
  p2: Point;
  // xmax和ymax代表最大可编辑范围
  xmax: number;
  ymax: number;
  // 控制点或线的尺寸
  controllSize: number;
  // 变化时触发
  onChange: (p1: Point, p2: Point) => void;
}
