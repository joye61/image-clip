import React from "react";

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