import { View } from "react-native";
import { SIZE } from "./notation";
import { Color, PieceSymbol, Square } from "chess.js";
import { memo } from "react";
import { toSquare } from "./helpers";

type Props = {
  state: {
    player: string;
    board: ({
      square: Square;
      type: PieceSymbol;
      color: Color;
    } | null)[][];
  };
  legalMoves: Square[];
};

export const HighlightMoves = memo(({ state, legalMoves }: Props) => {
  return (
    <>
      {state.board.map((row, y) =>
        row.map((piece, x) => {
          const position = toSquare({ x, y });
          const active = legalMoves.includes(position);

          let original = {
            position: "absolute",
            zIndex: 0,
            width: SIZE / 2,
            height: SIZE / 2,
            top: SIZE / 4,
            left: SIZE / 4,
            borderRadius: SIZE / 2,
            backgroundColor: active
              ? "rgba(100, 100, 100, 0.5)"
              : "transparent",
            transform: [{ translateX: x * SIZE }, { translateY: y * SIZE }],
          } as any;
          if (piece) {
            original = {
              position: "absolute",
              zIndex: 0,
              backgroundColor: active
                ? "rgba(100, 100, 100, 0.5)"
                : "transparent",
              transform: [{ translateX: x * SIZE }, { translateY: y * SIZE }],
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
            } as any;
          }

          return <View style={original} key={Math.random()} />;
        })
      )}
    </>
  );
});
