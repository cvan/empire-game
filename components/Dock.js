import React from "react";
import { Box, Image, Flex } from "@chakra-ui/core";
import news from "../images/news.png";
import empire from "../images/empire.png";
import managers from "../images/managers.png";
import messages from "../images/messages.png";

const apps = [
  {
    name: "News",
    src: news,
  },
  {
    name: "Empire",
    src: empire,
  },
  {
    name: "Managers",
    src: managers,
  },
  {
    name: "Messages",
    src: messages,
  },
];

export default ({ children }) => {
  return (
    <Box
      background="#333333"
      maxWidth="50rem"
      margin="auto"
      position="relative"
      borderRadius="2rem"
    >
      {children}
      <Flex
        position="absolute"
        bottom="0"
        width="100%"
        background="rgba(255,255,255,0.75)"
        p="2"
        justifyContent="center"
      >
        {apps.map((app) => (
          <Image
            key={app.name}
            src={app.src}
            m="0.75rem"
            boxShadow="4px 4px 3px 0px rgba(0,0,0,0.24)"
            borderRadius="1.5rem"
            maxWidth="5rem"
          />
        ))}
      </Flex>
    </Box>
  );
};
