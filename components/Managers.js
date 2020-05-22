import React, { useContext } from "react";

import { Flex, Box, Button, Progress } from "@chakra-ui/core";
import { GameDispatch, GameState } from "../containers/Container";

export default () => {
  const gameState = useContext(GameState);

  return <Flex>Managers</Flex>;
};
