import React, { useContext } from "react";

import { Box, Button } from "@chakra-ui/core";
import {
  AccountsDispatch,
  AccountsState,
  CompaniesState,
  CompaniesDispatch,
} from "../containers/Container";
import NumberFormat from "react-number-format";
import config from "../config";

export default () => {
  const accountsDispatch = useContext(AccountsDispatch);
  const accountsState = useContext(AccountsState);
  const companies = useContext(CompaniesState);
  const dispatch = useContext(CompaniesDispatch);

  const hireManager = (key, cost) => {
    dispatch({ type: "hire_manager", payload: key });
    accountsDispatch({ type: "debit", payload: cost });
  };

  return (
    <Box>
      <h2>Managers</h2>
      {Object.keys(companies).map((key) => {
        const company = companies[key];
        if (!company.manager) {
          return (
            <Box key={`manager-${key}`} borderWidth="1px">
              <Button
                onClick={() => hireManager(key, company.manager_cost)}
                disabled={company.manager_cost > accountsState.balance}
              >
                Manager runs&nbsp;
                <em>{key}</em>, Hire for &nbsp;
                <NumberFormat
                  value={companies[key].manager_cost}
                  {...config.numberFormat}
                />
              </Button>
            </Box>
          );
        }
      })}
    </Box>
  );
};
