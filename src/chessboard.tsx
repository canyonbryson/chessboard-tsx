import { Text, View } from "react-native";
import { Chess, Square } from "chess.js";
import { useCallback, useState } from "react";
import { useConst } from "./useConst";
import { Board } from "./board";

const ChessBoard = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });
  const [selectedPiece, setSelectedPiece] = useState<string>();
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);

  const setSelected = (piece?: string | any) => {
    if (typeof piece === "function") {
      const selected = piece(selectedPiece);
      setSelectedPiece(selected);
      if (selected === undefined) {
        setLegalMoves([]);
        return;
      }
      const moves = chess.moves({
        square: selected.slice(2) as any,
        verbose: true,
      });
      setLegalMoves(moves.map((move) => move.to));
      return;
    }
    if (piece === undefined) {
      setLegalMoves([]);
      setSelectedPiece(undefined);
      return;
    }
    const moves = chess.moves({
      square: piece.slice(2) as any,
      verbose: true,
    });
    setLegalMoves(moves.map((move) => move.to));
    setSelectedPiece(piece);
  };

  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
    });
    setSelectedPiece(undefined);
    setLegalMoves([]);
  }, [chess, state.player]);

  const onMove = useCallback(
    (square: Square, selectedPiece: string) => {
      const legalMove = legalMoves.includes(square);
      if (legalMove) {
        chess.move({
          from: selectedPiece?.slice(2) as any,
          to: square as any,
        });
        onTurn();
      } else {
        setSelectedPiece(undefined);
      }
    },
    [chess, legalMoves, onTurn]
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 24,
        }}
      >
        ChessBoard.tsx
      </Text>
      <Board
        state={state}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelected}
        onMove={onMove}
        legalMoves={legalMoves}
      />
    </View>
  );
};
