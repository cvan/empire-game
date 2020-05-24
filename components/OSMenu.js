import { Box } from "@chakra-ui/core";

export default ({ children }) => (
  <Box
    background="rgba(255,255,255,0.4)"
    textAlign="center"
    height="2rem"
    lineHeight="2rem"
    fontWeight="bold"
    fontSize="sm"
    boxShadow="3px 3px 10px 0px rgba(0,0,0,0.1)"
  >
    <h2>{children}</h2>
  </Box>
);
