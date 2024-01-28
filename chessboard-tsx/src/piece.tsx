import React, { memo } from "react";
import { Image, View } from "react-native";

import { SIZE } from "./notation";

type Player = "b" | "w";
type Type = "q" | "r" | "n" | "b" | "k" | "p";
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
  br: require("../assets/br.png"),
  bp: require("../assets/bp.png"),
  bn: require("../assets/bn.png"),
  bb: require("../assets/bb.png"),
  bq: require("../assets/bq.png"),
  bk: require("../assets/bk.png"),
  wr: require("../assets/wr.png"),
  wn: require("../assets/wn.png"),
  wb: require("../assets/wb.png"),
  wq: require("../assets/wq.png"),
  wk: require("../assets/wk.png"),
  wp: require("../assets/wp.png"),
};

type PieceProps = {
  id: Piece;
};

const Piece = memo(({ id }: PieceProps) => {
  const style = {
    position: "absolute",
    zIndex: 10,
  } as any;
  return (
    <View style={style}>
      <Image source={PIECES[id]} style={{ width: SIZE, height: SIZE }} />
    </View>
  );
});

export default Piece;
