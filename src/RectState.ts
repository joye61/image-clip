import React from "react";
import { RectState } from "./types";

interface ChangeRect {
  change: (rectState: RectState) => void;
}
export const RectContext = React.createContext<RectState & ChangeRect>({
  p1: { x: 0, y: 0 },
  p2: { x: 0, y: 0 },
  change: () => {}
});
