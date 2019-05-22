import React from "react";
import { ClipType, PointType } from "./types";

interface ImageClipContext {
  controllSize: number;
  clipType: ClipType;
  pointType: PointType;
}

export const context = React.createContext<ImageClipContext>({
  controllSize: 10,
  clipType: "rect",
  pointType: "rounded"
});

export const { Provider, Consumer } = context;
