import React, { useContext } from "react";
import { Box } from "@chakra-ui/core";
import { GameState } from "../containers/Container";
import Companies from "./Companies";
import Managers from "./Managers";
import News from "./News";
import Chat from "./Chat";

const appStyles = {
  position: "absolute",
  top: 0,
  width: "100%",
};

export default ({ children, ...props }) => {
  const { current_menu } = useContext(GameState);

  const setStyleProps = (menu) => {
    return {
      visibility: current_menu === menu ? "visible" : "hidden",
      ...appStyles,
    };
  };

  return (
    <Box position="relative" {...props}>
      <News {...setStyleProps("news")} />
      <Companies {...setStyleProps("companies")} />
      <Managers {...setStyleProps("managers")} />
      <Chat {...setStyleProps("messages")} />
    </Box>
  );
};
