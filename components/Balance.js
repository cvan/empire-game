import React, { useContext } from "react";
import { AccountsState } from "../containers/Container";
import { Box } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import config from "../config";

export default (props) => {
  const { balance } = useContext(AccountsState);

  return (
    <Box textAlign="center" fontSize="xl" {...props}>
      <NumberFormat value={balance} {...config.numberFormat} />

      <Box>
        {balance < 1000 && "Parents place is pretty nice"}
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
