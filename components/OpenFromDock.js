import { Box } from "@chakra-ui/core";
import { FiArrowDown } from "react-icons/fi";

export default () => (
  <Box textAlign="center" mt="3rem" fontSize="sm" color="grey">
    Open from the Dock
    <br />
    <Box m="auto" width="2rem">
      <FiArrowDown size="2rem" />
    </Box>
  </Box>
);
