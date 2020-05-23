import React, { createContext, useReducer } from "react";

import initialCompaniesState from "../data/companies";

const initialState = {
  balance: 0,
};

const companyStateDefaults = {
  manager: false,
  purchased: false,
};

export const GameState = createContext();
export const GameDispatch = createContext();
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
  const [state, dispatch] = useReducer(reducer, initialState);

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
    <GameDispatch.Provider value={dispatch}>
      <GameState.Provider value={state}>
        <CompaniesDispatch.Provider value={dispatchCompanies}>
          <CompaniesState.Provider value={companies}>
            {children}
          </CompaniesState.Provider>
        </CompaniesDispatch.Provider>
      </GameState.Provider>
    </GameDispatch.Provider>
  );
};

export default Container;
