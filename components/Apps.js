import React, { useContext } from "react";
import { Flex } from "@chakra-ui/core";
import { GameState } from "../containers/Container";
import Companies from "./Companies";
import Managers from "./Managers";
import News from "./News";
import Chat from "./Chat";

const defaultAppStyles = {
  position: "absolute",
  top: 0,
  maxWidth: "40rem",
  m: "auto",
  width: "90%",
  height: "100%",
  borderRadius: "0.7rem",
  overflow: "hidden",
  boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.24)"
};

export default ({ children, ...props }) => {
  const { current_menu } = useContext(GameState);

  const setStyleProps = (menuKey) => {
    return {
      ...defaultAppStyles,
      background: current_menu === menuKey ? "white" : "transparent",
      transition: "transform 0.2s ease-in-out, opacity 0.05s ease-in-out 0.15s",
      opacity: current_menu === menuKey ? "1" : "0",
      transformOrigin: "bottom",
      transform: current_menu === menuKey ? "scale(1)" : "scale(0)"
    };
  };

  return (
    <Flex
      position="relative"
      {...props}
      alignItems="center"
      justifyContent="center"
      height="100%"
      mb="7.5rem"
    >
      <News {...setStyleProps("news")} />
      <Companies {...setStyleProps("companies")} />
      <Managers {...setStyleProps("managers")} />
      <Chat {...setStyleProps("messages")} />
    </Flex>
  );
};
