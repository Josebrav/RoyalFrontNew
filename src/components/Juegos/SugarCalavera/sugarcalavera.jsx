import React from "react";
import { useSelector } from "react-redux";
import GameFrame from "../GameFrame/gameFrame";

const SugarCalavera = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const jugadorID = currentUser?.id || "default-id";
  const gameURL = `https://sugarcalavera.s3.us-east-1.amazonaws.com/calavera/index.html?jugadorID=${jugadorID}`;

  return <GameFrame src={jugadorID ? gameURL : null} title="Sugar Calavera" nativeWidth={1920} nativeHeight={1080} />;
};

export default SugarCalavera;
