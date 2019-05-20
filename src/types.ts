export interface ChangeResult {
  imageWidth: number;
  imageHeight: number;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

export interface ImageClipOption {
  source: string | HTMLImageElement;
  onChange?: (res: ChangeResult)=>void;
  containerPadding?: number;
  containerWidth?: number;
  containerHeight?: number;
}

export interface ImageClipState {
  loaded: boolean;
}