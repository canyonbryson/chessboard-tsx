import { Color, PieceSymbol, Square } from "chess.js";
import { View } from "react-native";
import { SIZE } from "./notation";

type Props = {
  state: {
    player: string;
    board: ({
      square: Square;
      type: PieceSymbol;
      color: Color;
    } | null)[][];
  };
  selectedPiece?: string;
};

export const HighlightCurrent = ({ state, selectedPiece }: Props) => {
  return (
    <>
      {state.board.map((row, y) =>
        row.map((piece, x) => {
          const active =
            selectedPiece === `${piece?.color}${piece?.type}${piece?.square}`;
          const original = {
            position: "absolute",
            width: SIZE,
            height: SIZE,
            zIndex: 0,
            backgroundColor: active ? "rgba(255, 255, 0, 0.5)" : "transparent",
            transform: [{ translateX: x * SIZE }, { translateY: y * SIZE }],
          } as any;
          if (piece === null) {
            return null;
          }
          return <View style={original} key={Math.random()} />;
        })
      )}
    </>
  );
};
