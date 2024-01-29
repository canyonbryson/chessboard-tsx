import { View } from "react-native";
import Background from "./background";
import { Pieces } from "./pieces";
import { HighlightCurrent } from "./highlightCurrent";
import { HighlightMoves } from "./highlightMoves";
import { Color, PieceSymbol, Square } from "chess.js";

export const Board = ({
  state,
  selectedPiece,
  setSelectedPiece,
  onMove,
  legalMoves,
}: {
  state: {
    player: string;
    board: ({
      square: Square;
      type: PieceSymbol;
      color: Color;
    } | null)[][];
  };
  selectedPiece: string | undefined;
  setSelectedPiece: (
    piece?:
      | string
      | ((prev: string | undefined) => string | undefined)
      | undefined
  ) => void;
  onMove: (square: Square, piece: string) => void;
  legalMoves: Square[];
}) => {
  return (
    <View>
      <Background />
      <Pieces
        state={state}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        onMove={onMove}
      />
      <HighlightCurrent state={state} selectedPiece={selectedPiece} />
      <HighlightMoves state={state} legalMoves={legalMoves} />
    </View>
  );
};
