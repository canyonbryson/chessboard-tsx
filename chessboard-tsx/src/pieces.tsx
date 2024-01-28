import { Pressable, View } from "react-native";
import Piece from "./piece";
import { Color, PieceSymbol, Square } from "chess.js";
import { SIZE } from "./notation";
import { toSquare } from "./helpers";
import { memo } from "react";

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
  setSelectedPiece: (
    piece?: string | ((prev: string | undefined) => undefined | string)
  ) => void;
  onMove: (square: Square, selectedPiece: string) => void;
};

export const Pieces = memo(
  ({ state, selectedPiece, setSelectedPiece, onMove }: Props) => {
    return (
      <>
        {state.board.map((row, y) =>
          row.map((piece, x) => {
            if (piece !== null) {
              return (
                <Pressable
                  key={`${x}${x}-${y}${y}`}
                  onPress={() => {
                    if (selectedPiece) {
                      const square = toSquare({ x, y });
                      onMove(square, selectedPiece);
                    } else {
                      setSelectedPiece((prev) =>
                        prev === `${piece.color}${piece.type}${piece.square}`
                          ? undefined
                          : `${piece.color}${piece.type}${piece.square}`
                      );
                    }
                  }}
                  style={{
                    position: "absolute",
                    width: SIZE,
                    height: SIZE,
                    zIndex: 1,
                    transform: [
                      { translateX: x * SIZE },
                      { translateY: y * SIZE },
                    ],
                  }}
                >
                  <Piece
                    key={`${x}-${y}`}
                    id={`${piece.color}${piece.type}` as const}
                  />
                </Pressable>
              );
            }
            if (piece === null && selectedPiece !== undefined) {
              return (
                <Pressable
                  key={`${x}${x}-${y}${y}`}
                  onPress={() => {
                    const square = toSquare({ x, y });
                    onMove(square, selectedPiece);
                  }}
                  style={{
                    position: "absolute",
                    width: SIZE,
                    height: SIZE,
                    zIndex: 1,
                    transform: [
                      { translateX: x * SIZE },
                      { translateY: y * SIZE },
                    ],
                  }}
                >
                  <View
                    key={`${x}-${y}`}
                    style={{
                      position: "absolute",
                      width: SIZE,
                      height: SIZE,
                      zIndex: 1,
                    }}
                  />
                </Pressable>
              );
            }
            return null;
          })
        )}
      </>
    );
  }
);
