import React, { useContext } from "react";
import { GameState } from "../containers/Container";
import NumberFormat from "react-number-format";
import config from "../config";

export default () => {
  const { balance } = useContext(GameState);

  return (
    <div>
      Balance:
      <NumberFormat value={balance} {...config.numberFormat} />
    </div>
  );
};
