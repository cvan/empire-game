import React, { useContext } from "react";
import { GameState } from "../containers/Container";

export default () => {
  const { balance } = useContext(GameState);

  return <div>Balance: {balance}</div>;
};
