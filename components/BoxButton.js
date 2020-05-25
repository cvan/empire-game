import { Box } from "@chakra-ui/core";

export default ({ disabled, children, ...props }) => {
  const disabledProps = {
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    pointerEvents: disabled ? "none" : "auto",
  };

  return (
    <Box {...disabledProps} {...props}>
      {children}
    </Box>
  );
};
