import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Flex, Box, Button, Progress } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import { GameDispatch, GameState } from "../containers/Container";
import { motion, useAnimation } from "framer-motion";
import config from "../config";

const companies = {
  Lemon: {
    production_time: 1000,
    unit_price: 1,
    company_purchase_cost: 0, // price at which additional companies can be purchased
    company_branch_cost: 4, // price of individual company
    company_branch_cost_multiplier: 1.05,
    branch_level_up_count: 5,
  },
  News: {
    production_time: 3000,
    unit_price: 600,
    company_purchase_cost: 5,
    company_branch_cost_multiplier: 1.1,
    company_branch_cost: 69,
    branch_level_up_count: 30,
  },
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

const Company = ({
  name,
  unit_price,
  company_purchase_cost,
  company_branch_cost,
  company_branch_cost_multiplier,
  production_time,
  branch_level_up_count,
}) => {
  const gameDispatch = useContext(GameDispatch);
  const gameState = useContext(GameState);
  const [state, dispatch] = useReducer(reducer, {
    branches: 1,
    level: 1,
    selling: false,
    purchased: false,
  });

  useEffect(() => {
    if (state.purchased) {
      gameDispatch({ type: "debit", payload: company_purchase_cost });
    }
  }, [state.purchased]);

  const duration = production_time / state.level / 1000;
  const countdownInterval = useRef(null);
  const [countdown, setCountdown] = useState(duration);

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
      }
    }
  }, [state.selling]);

  const animationControl = useAnimation();
  const aggregateCost = state.branches * unit_price;

  const sell = async () => {
    dispatch({ type: "selling", payload: true });
    await animationControl.start({
      transition: { duration },
      scaleX: [0, 1],
    });
    dispatch({ type: "selling", payload: false });
    gameDispatch({ type: "credit", payload: aggregateCost });
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
    gameDispatch({ type: "debit", payload: branchCost });
  };

  return (
    <Box>
      {!state.purchased ? (
        <Box borderWidth="1px">
          <Button
            disabled={gameState.balance < company_purchase_cost}
            onClick={() => dispatch({ type: "buy_company" })}
          >
            Buy {name} Corp for {company_purchase_cost}
          </Button>
        </Box>
      ) : (
        <Flex borderWidth="1px">
          <Box>
            <Button onClick={sell} height="5rem" disabled={state.selling}>
              <Flex flexDirection="column">
                <Box>{name}</Box>
                <Box>{state.branches}</Box>
                <Progress value={getLevelProgress(state.branches) * 100} />
              </Flex>
            </Button>
          </Box>
          <Box p="2">
            <Box borderWidth="1px">
              {aggregateCost}
              <br />
              <motion.div
                animate={animationControl}
                style={{
                  background: "orange",
                  height: "1rem",
                }}
              />
            </Box>
            <Flex>
              <Button
                disabled={gameState.balance < branchCost}
                onClick={() => buyBranch()}
              >
                Buy 1x
                <NumberFormat value={branchCost} {...config.numberFormat} />
              </Button>
              <Box>
                <NumberFormat value={countdown} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default () => {
  return (
    <div>
      {Object.keys(companies).map((key) => {
        return <Company key={key} name={key} {...companies[key]} />;
      })}
    </div>
  );
};
