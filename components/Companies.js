import React, { useContext } from "react";
import { Box, Grid } from "@chakra-ui/core";
import Company from "./Company";
import { CompaniesState } from "../containers/Container";
import AppHead from "./AppHead";

export default (props) => {
  const companies = useContext(CompaniesState);
  return (
    <Box {...props}>
      <AppHead background="#da201a">Megapreneur</AppHead>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        p="3"
        gap="2"
      >
        {Object.keys(companies).map((key) => {
          return (
            <Company id={key} key={`company-${key}`} {...companies[key]} />
          );
        })}
      </Grid>
    </Box>
  );
};
