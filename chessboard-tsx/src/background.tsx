import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;

const DARK = "rgb(100, 133, 200)";
const LIGHT = "rgb(230, 233, 250)";

const eight = [0, 0, 0, 0, 0, 0, 0, 0];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

type RowProps = {
  row: number;
};

type SquareProps = RowProps & {
  col: number;
};

const Square = ({ row, col }: SquareProps) => {
  const [backgroundColor, color] =
    (row + col) % 2 === 0 ? [LIGHT, DARK] : [DARK, LIGHT];
  const textStyle = {
    fontWeight: "500" as const,
    color,
    fontSize: screenWidth / 40,
    position: "absolute" as const,
    top: 0,
    left: 2,
  };
  const letterStyle = {
    fontWeight: "500" as const,
    color,
    fontSize: screenWidth / 40,
    position: "absolute" as const,
    bottom: 0,
    right: 2,
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        padding: 2,
        justifyContent: "space-between",
      }}
    >
      <Text style={[textStyle, { opacity: col === 0 ? 1 : 0 }]}>
        {"" + (8 - row)}
      </Text>
      {row === 7 && (
        <Text style={[letterStyle, { alignSelf: "flex-end" }]}>
          {String.fromCharCode(97 + col)}
        </Text>
      )}
    </View>
  );
};

const Row = ({ row }: RowProps) => {
  return (
    <View style={styles.container}>
      {eight.map((_, i) => (
        <Square row={row} col={i} key={i} />
      ))}
    </View>
  );
};

const Background = () => {
  return (
    <View style={{ width: screenWidth, padding: 0, height: screenWidth }}>
      {eight.map((_, i) => (
        <Row key={i} row={i} />
      ))}
    </View>
  );
};

export default Background;
