import React, { useContext } from "react";
import { AccountsState } from "../containers/Container";
import { Box } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import config from "../config";

export default (props) => {
  const { balance } = useContext(AccountsState);

  return (
    <Box {...props} py="1rem">
      <Box textAlign="center" fontSize="3rem" fontWeight="bold">
        <NumberFormat value={balance} {...config.numberFormat} />
      </Box>

      <Box textAlign="center">
        {balance < 1000 && "Parents place is pretty nice 🙄"}
        {balance > 1000 && balance < 10000 && "#Vanlife"}
        {balance > 10000 && balance < 100000 && "Ballin'"}
        {balance > 100000 && balance < 500000 && "Truffles are pretty dope!"}
        {balance > 500000 &&
          balance < 10000000 &&
          "Everything on the menu please"}
        {balance > 1000000 && balance < 50000000 && "There's too much of it"}
        {balance > 50000000 &&
          balance < 100000000 &&
          "Have my cake AND eat it?!"}
        {balance > 100000000 && "We're done, thank you!"}
      </Box>
    </Box>
  );
};
