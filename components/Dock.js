import React, { useContext } from "react";
import { Box, Image, Flex } from "@chakra-ui/core";
import { GameState, GameDispatch } from "../containers/Container";

export default (props) => {
  const { menu } = useContext(GameState);
  const dispatch = useContext(GameDispatch);

  return (
    <Flex
      position="absolute"
      bottom="0"
      width="100%"
      background="rgba(255,255,255,0.3)"
      p="2"
      justifyContent="center"
      {...props}
    >
      {Object.keys(menu).map(
        (key) =>
          menu[key].installed && (
            <Image
              onClick={() => dispatch({ type: "open_menu", payload: key })}
              key={`menu-${key}`}
              src={menu[key].src}
              m="0.75rem"
              boxShadow="3px 3px 4px 0px rgba(0,0,0,0.24)"
              borderRadius="1.2rem"
              maxWidth="5rem"
              cursor="pointer"
              width="4rem"
            />
          )
      )}
    </Flex>
  );
};
