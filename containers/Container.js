import React, { createContext, useReducer } from "react";

import initialCompaniesState from "../data/companies";

const accountsInitialState = {
  balance: 0,
};

const companyStateDefaults = {
  manager: false,
  purchased: false,
};

export const AccountsState = createContext();
export const AccountsDispatch = createContext();
export const CompaniesState = createContext();
export const CompaniesDispatch = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "credit":
      return { ...state, balance: state.balance + action.payload };
    case "debit":
      return { ...state, balance: state.balance - action.payload };
    default:
      throw new Error();
  }
};

const companyReducer = (state, action) => {
  switch (action.type) {
    case "buy_company":
      state[action.payload].purchased = true;
      return {
        ...state,
      };
    case "hire_manager":
      state[action.payload].manager = true;
      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

const Container = ({ children }) => {
  const [accountsState, accountsDispatch] = useReducer(
    reducer,
    accountsInitialState
  );

  const mergedInitialCompanyState = () => {
    let merged = {};
    Object.keys(initialCompaniesState).map((key) => {
      merged[key] = {
        ...initialCompaniesState[key],
        ...companyStateDefaults,
      };
    });
    return merged;
  };

  const [companies, dispatchCompanies] = useReducer(
    companyReducer,
    mergedInitialCompanyState()
  );

  return (
    <AccountsDispatch.Provider value={accountsDispatch}>
      <AccountsState.Provider value={accountsState}>
        <CompaniesDispatch.Provider value={dispatchCompanies}>
          <CompaniesState.Provider value={companies}>
            {children}
          </CompaniesState.Provider>
        </CompaniesDispatch.Provider>
      </AccountsState.Provider>
    </AccountsDispatch.Provider>
  );
};

export default Container;
