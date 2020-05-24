import React, { useContext } from "react";
import { Flex, Box } from "@chakra-ui/core";
import Company from "./Company";
import { CompaniesState } from "../containers/Container";
import AppHead from "./AppHead";

export default (props) => {
  const companies = useContext(CompaniesState);
  return (
    <Box {...props}>
      <AppHead>Companies</AppHead>
      <Flex>
        {Object.keys(companies).map((key) => {
          return (
            <Box width="2rem" key={`company-${key}`}>
              <Company id={key} {...companies[key]} />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
