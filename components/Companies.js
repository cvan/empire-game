import React, { useContext } from "react";
import { Flex, Box } from "@chakra-ui/core";
import Company from "./Company";
import { CompaniesState } from "../containers/Container";

export default () => {
  const companies = useContext(CompaniesState);
  return (
    <Flex>
      {Object.keys(companies).map((key) => {
        return (
          <Box widht="2rem" key={`company-${key}`}>
            <Company id={key} {...companies[key]} />
          </Box>
        );
      })}
    </Flex>
  );
};
