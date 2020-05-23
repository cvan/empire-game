import React, { useContext } from "react";
import { GameState } from "../containers/Container";
import { Box } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import config from "../config";

export default () => {
  const { balance } = useContext(GameState);

  return (
    <Box textAlign="center" fontSize="xl">
      <NumberFormat value={balance} {...config.numberFormat} />
    </Box>
  );
};
