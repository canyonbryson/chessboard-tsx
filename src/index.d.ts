import { Color, PieceSymbol, Square } from "chess.js";

declare module "chessboard-tsx" {
  import { ComponentType } from "react";

  export interface ChessboardProps {
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
  }

  const Board: ComponentType<ChessboardProps>;

  export { Board };
}
