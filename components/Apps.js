import React, { useContext } from "react";
import { Flex, Box } from "@chakra-ui/core";
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
  background: "white",
  borderRadius: "0.7rem",
  overflow: "hidden",
  boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.24)",
};

export default ({ children, ...props }) => {
  const { current_menu } = useContext(GameState);

  const setStyleProps = (menuKey) => {
    return {
      visibility: current_menu === menuKey ? "visible" : "hidden",

      // todo: we'll use props here to manage transitions for apps as well.

      ...defaultAppStyles,
    };
  };

  return (
    <Flex
      position="relative"
      {...props}
      alignItems="center"
      justifyContent="center"
      height="100%"
      mt="2rem"
      mb="10rem"
    >
      <News {...setStyleProps("news")} />
      <Companies {...setStyleProps("companies")} />
      <Managers {...setStyleProps("managers")} />
      <Chat {...setStyleProps("messages")} />
    </Flex>
  );
};
