import React, { useReducer, useContext, useRef, useEffect } from "react";
import { Flex, Box, Button } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import { GameDispatch, GameState } from "../containers/Container";
import { motion, useAnimation } from "framer-motion";

const companies = {
  Lemon: {
    production_time: 1000,
    unit_price: 1,
    company_purchase_price: 0, // price at which additional companies can be purchased
    company_price: 4, // price of individual company
    company_level_count: 25,
  },
  News: {
    production_time: 3000,
    unit_price: 60,
    company_purchase_price: 10,
    company_price: 69,
    company_level_count: 30,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "selling":
      return { ...state, selling: action.payload };
    case "buy_company":
      return { ...state, purchased: true };
    default:
      throw new Error();
  }
};

const Company = ({
  name,
  unit_price,
  company_purchase_price,
  company_price,
  production_time,
}) => {
  const gameDispatch = useContext(GameDispatch);
  const gameState = useContext(GameState);

  const [state, dispatch] = useReducer(reducer, {
    company_count: 1,
    aggregate_cost: unit_price, // price to buy single unit
    selling: false,
    purchased: false,
  });

  const sellTimeout = useRef(null);
  const animationControl = useAnimation();

  useEffect(() => {
    if (state.purchased) {
      gameDispatch({ type: "buy_company", payload: company_purchase_price });
    }
  }, [state.purchased]);

  const sell = () => {
    dispatch({ type: "selling", payload: true });
    animationControl.start({
      transition: { duration: production_time / 1000 },
      scaleX: [0, 1],
    });
    sellTimeout.current = window.setTimeout(() => {
      dispatch({ type: "selling", payload: false });
      gameDispatch({ type: "sold", payload: state.aggregate_cost });
      sellTimeout.current = null;
    }, production_time);
  };

  return (
    <Box>
      {!state.purchased ? (
        <Box borderWidth="1px">
          <Button
            // borderWidth="1px"
            disabled={gameState.balance < company_purchase_price ? true : false}
            onClick={() => dispatch({ type: "buy_company" })}
          >
            Buy {name} Corp for {company_purchase_price}
          </Button>
        </Box>
      ) : (
        <Flex borderWidth="1px">
          <Box p="2">
            <Button
              borderWidth="1px"
              onClick={sell}
              disabled={state.selling ? true : false}
            >
              {name} <br />
              {state.company_count}
            </Button>
          </Box>
          <Box p="2">
            <Box borderWidth="1px">
              {state.aggregate_cost}
              <br />
              <motion.div
                duration="3"
                animate={animationControl}
                style={{
                  background: "orange",
                  height: "1rem",
                }}
              />
            </Box>
            <Flex>
              <Button>
                Buy 1x
                <NumberFormat
                  value={company_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                ></NumberFormat>
              </Button>
              <Box>
                {/* Todo: countdown */}
                {production_time / 1000}
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
