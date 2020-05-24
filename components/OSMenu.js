import { Box } from "@chakra-ui/core";
import { FiList } from "react-icons/fi";

export default ({ children }) => (
  <Box
    background="rgba(255,255,255,0.4)"
    textAlign="center"
    height="2rem"
    lineHeight="2rem"
    fontWeight="bold"
    fontSize="sm"
    boxShadow="3px 3px 10px 0px rgba(0,0,0,0.1)"
    position="relative"
  >
    <h2>{children}</h2>
    <Box position="absolute" top="0.4rem" right="1rem">
      <FiList size="1.2rem" />
    </Box>
  </Box>
);
