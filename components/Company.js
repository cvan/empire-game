import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import { Box } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import {
  AccountsDispatch,
  AccountsState,
  CompaniesDispatch,
} from "../containers/Container";
import { motion, useAnimation } from "framer-motion";
import config from "../config";

const initialCompanyState = {
  branches: 1,
  level: 1,
  selling: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "selling":
      return { ...state, selling: action.payload };
    case "buy_company":
      return { ...state, purchased: true };
    case "buy_branch":
      return { ...state, branches: state.branches + 1 };
    case "add_level":
      return { ...state, level: state.level + 1 };
    default:
      throw new Error();
  }
};

const BoxButton = ({ disabled, children, ...props }) => {
  const disabledProps = {
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    pointerEvents: disabled ? "none" : "auto",
  };

  return (
    <Box {...disabledProps} {...props}>
      {children}
    </Box>
  );
};

const CompanyIcon = () => (
  <Box
    background="green"
    width="4rem"
    height="4rem"
    borderRadius="2rem"
    m="auto"
  ></Box>
);

const LevelProgress = ({ value, children, ...props }) => (
  <Box position="relative" height="1.5rem" {...props}>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "1.5rem",
        transform: `scaleX(${value})`,
        transformOrigin: "0 0",
        background: "green",
      }}
      {...props}
    ></div>
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      textAlign="center"
      lineHeight="1.5rem"
    >
      {children}
    </Box>
  </Box>
);

export default ({
  id,
  name,
  unit_price,
  company_purchase_cost,
  company_branch_cost,
  company_branch_cost_multiplier,
  production_time,
  branch_level_up_count,
  manager,
  purchased,
}) => {
  const accountsDispatch = useContext(AccountsDispatch);
  const accountsState = useContext(AccountsState);
  const companiesDispatch = useContext(CompaniesDispatch);

  const [state, dispatch] = useReducer(reducer, initialCompanyState);

  useEffect(() => {
    if (purchased) {
      accountsDispatch({ type: "debit", payload: company_purchase_cost });
    }
  }, [purchased]);

  const duration = production_time / state.level / 1000;
  const countdownInterval = useRef(null);
  const [countdown, setCountdown] = useState(duration);

  const onFinishSale = () => {
    // if we've got a manager on board, we'll continue the gravy train!
    if (manager) {
      sell();
    }
  };

  useEffect(() => setCountdown(duration), [state.level]);

  useEffect(() => {
    if (state.selling) {
      countdownInterval.current = setInterval(() => {
        setCountdown((prevState) => prevState - 1);
      }, 1000);
    } else {
      if (countdownInterval.current !== null || countdown <= 0) {
        setCountdown(duration);
        clearInterval(countdownInterval.current);
        onFinishSale();
      }
    }
    return () => {
      clearInterval(countdownInterval.current);
    };
  }, [state.selling, manager]);

  const animationControl = useAnimation();
  const aggregateCost = state.branches * unit_price;

  const sell = async () => {
    dispatch({ type: "selling", payload: true });
    await animationControl.start({
      transition: { duration },
      scaleY: [0, 1],
      originY: [1, 1],
    });
    dispatch({ type: "selling", payload: false });
    accountsDispatch({ type: "credit", payload: aggregateCost });
  };

  const getLevelProgress = (branches) =>
    (branches % branch_level_up_count) / branch_level_up_count;

  const branchCost =
    state.branches * company_branch_cost * company_branch_cost_multiplier;

  const buyBranch = () => {
    if (getLevelProgress(state.branches + 1) === 0) {
      dispatch({ type: "add_level" });
    }
    dispatch({ type: "buy_branch" });
    accountsDispatch({ type: "debit", payload: branchCost });
  };

  return (
    <Box width="10rem" borderWidth="1px" p="2">
      {!purchased ? (
        <BoxButton
          disabled={accountsState.balance < company_purchase_cost}
          onClick={() =>
            companiesDispatch({ type: "buy_company", payload: id })
          }
          textAlign="center"
          height="100%"
          p="3"
        >
          Start {name} <br />
          {company_purchase_cost}
        </BoxButton>
      ) : (
        <Box textAlign="center">
          <Box>{name}</Box>
          <Box>
            ${aggregateCost}
            <br />
            <motion.div
              animate={animationControl}
              style={{
                background: "orange",
                height: "3rem",
                width: "2rem",
                margin: "auto",
              }}
            />
          </Box>

          <Box>
            <NumberFormat
              displayType="text"
              value={countdown}
              decimalScale="2"
            />
            <br />
            {state.level > 1 && <Box>{state.level}x Speed</Box>}
          </Box>

          <Box>
            <BoxButton onClick={sell} disabled={state.selling}>
              <CompanyIcon />
            </BoxButton>

            <LevelProgress value={getLevelProgress(state.branches)} mt="1rem">
              {state.branches}
            </LevelProgress>

            <BoxButton
              mt="1rem"
              disabled={accountsState.balance < branchCost}
              onClick={() => buyBranch()}
              background="gray"
            >
              buy +1
              <br />
              <NumberFormat value={branchCost} {...config.numberFormat} />
            </BoxButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
