import React, { useContext } from "react";
import Company from "./Company";
import { CompaniesState } from "../containers/Container";

export default () => {
  const companies = useContext(CompaniesState);
  return (
    <div>
      {Object.keys(companies).map((key) => {
        return <Company key={key} name={key} {...companies[key]} />;
      })}
    </div>
  );
};
