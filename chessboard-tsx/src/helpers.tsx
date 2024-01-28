import { Square } from "chess.js";

export const toSquare = (v: { x: number; y: number }) => {
  const col = String.fromCharCode(97 + Math.round(v.x));
  const row = `${8 - Math.round(v.y)}`;
  return `${col}${row}` as Square;
};
