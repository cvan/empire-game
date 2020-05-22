import React, { createContext, useReducer } from "react";

const initialState = {
  balance: 0,
};

export const GameState = createContext();
export const GameDispatch = createContext();

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

const Container = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameDispatch.Provider value={dispatch}>
      <GameState.Provider value={state}>{children}</GameState.Provider>
    </GameDispatch.Provider>
  );
};

export default Container;
