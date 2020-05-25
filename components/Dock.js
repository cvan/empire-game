import React, { useContext } from "react";
import { Image, Flex, Box, Badge } from "@chakra-ui/core";
import { GameState, GameDispatch } from "../containers/Container";

export default ({ size = "4rem", ...props }) => {
  const { menu } = useContext(GameState);
  const dispatch = useContext(GameDispatch);

  const onMenuClick = (key) => {
    dispatch({ type: "open_menu", payload: key });

    if (menu[key].badge) {
      dispatch({
        type: "set_app_badge",
        payload: { key, value: false },
      });
    }
  };

  return (
    <Flex
      position="absolute"
      bottom="0"
      width="100%"
      background="rgba(255,255,255,0.3)"
      p="1"
      justifyContent="center"
      {...props}
    >
      {Object.keys(menu).map(
        (key) =>
          menu[key].installed && (
            <Box
              key={`menu-${key}`}
              position="relative"
              width={size}
              height={size}
              m="0.75rem"
            >
              <Image
                src={menu[key].src}
                onClick={() => onMenuClick(key)}
                position="absolute"
                top="0"
                boxShadow="3px 3px 4px 0px rgba(0,0,0,0.24)"
                borderRadius="1.2rem"
                cursor="pointer"
                width="100%"
                height="100%"
              />
              {menu[key].badge && (
                <Badge
                  color="white"
                  fontWeight="bold"
                  textAlign="center"
                  background="#ff4122"
                  position="absolute"
                  right="-0.25rem"
                  top="-0.25rem"
                  borderRadius="0.6rem"
                  width="1.2rem"
                  height="1.2rem"
                  lineHeight="1.2rem"
                />
              )}
            </Box>
          )
      )}
    </Flex>
  );
};
