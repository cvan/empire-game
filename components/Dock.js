import { Box, Image, Flex } from "@chakra-ui/core";
import news from "../images/news.png";
import empire from "../images/empire.png";
import managers from "../images/managers.png";
import messages from "../images/messages.png";

const iconImageParams = {
  m: "0.75rem",
};
export default () => (
  <Flex
    position="fixed"
    bottom="0"
    width="100%"
    background="rgba(255,255,255,0.75)"
    p="2"
    justifyContent="center"
  >
    <Image src={news} {...iconImageParams} />
    <Image src={empire} {...iconImageParams} />
    <Image src={managers} {...iconImageParams} />
    <Image src={messages} {...iconImageParams} />
  </Flex>
);
