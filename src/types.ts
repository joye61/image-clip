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
  controllPointSize?: number;
}

export interface ImageClipState {
  loaded: boolean;
}

export interface With2PointsEditOption {
  editWidth: number;
  editHeight: number;
  controllPointSize?: number;
  imageUrl: string;
  onChange?: () => void;
}

export interface Point {
  x: number;
  y: number;
}

export interface With2PointsEditState {
  p1: Point;
  p2: Point;
  [key: string]: Point;
}

export interface ControllPointOption {
  x: number;
  y: number;
  xmax: number;
  ymax: number;
  controllPointSize: number;
  onChange: (p: Point) => void;
}
