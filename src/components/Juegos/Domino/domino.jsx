import React from "react";
import { useSelector } from "react-redux";
import GameFrame from "../GameFrame/gameFrame";

// TODO: falta el bucket/prefijo de S3 del build de Unity (pendiente de que lo pasen) — hasta
// entonces src queda en null y GameFrame muestra el spinner de carga en vez de romper.
const Domino = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const jugadorID = currentUser?.id || "default-id";
  const gameURL = null;

  return <GameFrame src={jugadorID ? gameURL : null} title="Dominó" nativeWidth={1920} nativeHeight={1080} />;
};

export default Domino;
