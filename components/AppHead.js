import { Box } from "@chakra-ui/core";

export default ({ children }) => (
  <Box background="orange" textAlign="center">
    <h2>{children}</h2>
  </Box>
);
