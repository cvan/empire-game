import React, { createContext, useReducer } from "react";

import initialCompaniesState from "../data/companies";

const initialState = {
  balance: 0,
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
  const [companies, dispatchCompanies] = useReducer(
    companyReducer,
    initialCompaniesState
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
