import { Box } from "@chakra-ui/core";

export default ({
  value,
  width = "6rem",
  height = "1.5rem",
  children,
  ...props
}) => (
  <Box
    position="relative"
    height={height}
    width={width}
    margin="auto"
    background="rgba(255,255,255,0.2)"
    borderRadius="0.3rem"
    overflow="hidden"
    {...props}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height,
        transform: `scaleX(${value})`,
        transformOrigin: "0 0",
        background: "#afbeca",
      }}
    />
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      textAlign="center"
      lineHeight="1.5rem"
    >
      {children}
    </Box>
  </Box>
);
