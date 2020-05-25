import { Box } from "@chakra-ui/core";

export default ({ children, background, foreground = "white", ...props }) => (
  <Box
    background={background || "#3965a5"}
    textAlign="center"
    width="100%"
    height="2.5rem"
    lineHeight="2.5rem"
    fontWeight="bold"
    color="white"
    position="relative"
    {...props}
  >
    <h2>{children}</h2>
    <Box
      position="absolute"
      width="1.2rem"
      height="1.2rem"
      right="0.6rem"
      top="0.6rem"
      borderRadius="0.6rem"
      background={foreground}
      opacity="0.3"
    />
  </Box>
);
