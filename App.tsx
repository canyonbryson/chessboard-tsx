import { StyleSheet, View } from "react-native";
import { ChessBoard } from "./src/chessboard";

export default function App() {
  return (
    <View style={styles.container}>
      <ChessBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
