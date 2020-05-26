import { Button } from "@chakra-ui/core";

export default (props) => (
  <Button
    _focus={{ boxShadow: "none" }}
    variantColor="green"
    size="lg"
    {...props}
  >
    INSTALL APP
  </Button>
);
