import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import { Box, Flex, Badge, Button, Image } from "@chakra-ui/core";
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

const CompanyIcon = ({ src, ...props }) => (
  <Box objectFit="cover" {...props}>
    <Image src={src} />
  </Box>
);

const LevelProgress = ({ value, children, ...props }) => (
  <Box
    position="relative"
    height="1.5rem"
    margin="auto"
    width="5rem"
    background="rgba(255,255,255,0.2)"
    borderRadius="0.5rem"
    overflow="hidden"
    {...props}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "1.5rem",
        transform: `scaleX(${value})`,
        transformOrigin: "0 0",
        background: "#afbeca",
      }}
    />
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
  icon,
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

  const canBePurchased = accountsState.balance >= company_purchase_cost;

  const containerStyles = {
    borderWidth: "1px",
    background: canBePurchased || purchased ? "#2196f3" : "white",
    color: canBePurchased || purchased ? "white" : "black",
  };

  const iconConfig = {
    size: 5,
    progress: 1,
  };

  return (
    <Box height="100%" borderRadius="0.75rem" p="3" {...containerStyles}>
      {!purchased ? (
        <BoxButton
          disabled={!canBePurchased}
          onClick={() =>
            companiesDispatch({ type: "buy_company", payload: id })
          }
          textAlign="center"
        >
          <Box fontWeight="bold">{name}</Box>
          <Box
            overflow="hidden"
            borderRadius={`${iconConfig.size + iconConfig.progress / 2}rem`}
            height={`${iconConfig.size + iconConfig.progress}rem`}
            width={`${iconConfig.size + iconConfig.progress}rem`}
            m="auto"
          >
            <CompanyIcon
              src={icon}
              height={`${iconConfig.size + iconConfig.progress}rem`}
              width={`${iconConfig.size + iconConfig.progress}rem`}
            />
          </Box>
          <Button
            variantColor={canBePurchased ? "green" : "gray"}
            fontWeight="bold"
            fontSize="lg"
          >
            {company_purchase_cost === 0 ? (
              "Start"
            ) : (
              <NumberFormat
                value={company_purchase_cost}
                {...config.numberFormat}
              />
            )}
          </Button>
        </BoxButton>
      ) : (
        <Box textAlign="center">
          <Box>{name}</Box>
          <Box>
            ${aggregateCost}
            <br />
          </Box>

          <Box>
            <BoxButton
              onClick={sell}
              disabled={state.selling}
              position="relative"
              height={`${iconConfig.size + iconConfig.progress}rem`}
              width={`${iconConfig.size + iconConfig.progress}rem`}
              margin="auto"
            >
              <div
                style={{
                  position: "relative",
                  width: `${iconConfig.size + iconConfig.progress}rem`,
                  height: `${iconConfig.size + iconConfig.progress}rem`,
                  borderRadius: `${
                    iconConfig.size + iconConfig.progress / 2
                  }rem`,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  id="selling-progress"
                  animate={animationControl}
                  style={{
                    background: "#afbeca",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  width: `${iconConfig.size}rem`,
                  height: `${iconConfig.size}rem`,
                  top: `${
                    (iconConfig.size + iconConfig.progress - iconConfig.size) /
                    2
                  }rem`,
                  left: `${
                    (iconConfig.size + iconConfig.progress - iconConfig.size) /
                    2
                  }rem`,
                  borderRadius: `${iconConfig.size / 2}rem`,
                  overflow: "hidden",
                }}
              >
                <CompanyIcon src={icon} width="100%" height="100%" />
              </div>
            </BoxButton>

            <Box id="countdown-timer">
              <NumberFormat
                displayType="text"
                value={countdown}
                decimalScale="2"
              />
              s&nbsp;
              {state.level > 1 && (
                <Badge variantColor="green">{state.level}x</Badge>
              )}
            </Box>

            <LevelProgress value={getLevelProgress(state.branches)}>
              {state.branches}
            </LevelProgress>

            <Button
              mt="1rem"
              disabled={accountsState.balance < branchCost}
              onClick={() => buyBranch()}
              borderRadius="0.5rem"
              variantColor={
                accountsState.balance > branchCost ? "green" : "gray"
              }
            >
              Buy +1&nbsp;
              <NumberFormat value={branchCost} {...config.numberFormat} />
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
