# Chessboard-TSX

Chessboard-TSX is an npm package that provides a chessboard component for rendering the board and pieces in a React Native application. It is designed to be used in conjunction with chess.js, a library that handles the logic of the chess pieces.

## Installation

You can install Chessboard-TSX using npm:

```bash
npm install chessboard-tsx
```

## Usage

First, import the Chessboard component from the package:

```tsx
import { Board } from "chessboard-tsx";
```

Then, you can use the Chessboard component in your React application:

```tsx
<Board
  state={state} // the state of the chess game, using chess.js
  selectedPiece={selectedPiece} // the currently selected piece
  setSelectedPiece={setSelected} // a function to set the selected piece
  onMove={onMove} // a function to handle a move
  legalMoves={legalMoves} // the legal moves for the selected piece
/>
```

Integration with chess.js
Chessboard-TSX is designed to be used with chess.js. You can use chess.js to handle the logic of the chess game, and then use Chessboard-TSX to render the board and pieces.

Here is an example of how to integrate Chessboard-TSX with chess.js:

```tsx
import { Text, View } from "react-native";
import { Chess, Square } from "chess.js";
import { useCallback, useState } from "react";
import { Board } from "chessboard-tsx";
import { useRef } from "react";

function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
}

export const ChessBoard = () => {
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
```

## Contributing

This is largely a personal project, but if you have any suggestions or improvements, feel free to open an issue or pull request. Or just fork the project and make your own version!

## License

This project is licensed under the MIT License - see the LICENSE.md file for details. ```
