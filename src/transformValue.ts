import { Rect, Point } from "./types";

/**
 * 根据平面坐标中任意两个点，得到一个矩形的坐标原点（左上角）和宽高
 *
 * @param p1 任意第一点
 * @param p2 任意第二点
 *
 * @return Rect
 */
export function transformValue(p1: Point, p2: Point): Rect {
  const width = Math.abs(p1.x - p2.x);
  const height = Math.abs(p1.y - p2.y);
  const x = p1.x < p2.x ? p1.x : p2.x;
  const y = p1.y < p2.y ? p1.y : p2.y;
  return { x, y, width, height };
}

export function rangeCheck(n: number, max: number): number {
  n = n < 0 ? 0 : n;
  n = n > max ? max : n;
  return n;
}
