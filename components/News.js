import { Box, Heading, Image, Flex, Button } from "@chakra-ui/core";
import AppHead from "./AppHead";
import empire from "../images/empire.png";
import managers from "../images/managers.png";
import { useContext, useMemo, useReducer, useEffect } from "react";
import {
  GameDispatch,
  GameState,
  AccountsState,
  CompaniesState,
} from "../containers/Container";

// todo: this can move to container
const ComponentState = Object.freeze({
  Intro: "INTRO",
  Installed: "INSTALLED",
  CanManage: "CAN_MANAGE",
  Managed: "MANAGED",
});

const reducer = (state, action) => {
  switch (action.type) {
    case "Install":
      return ComponentState.Installed;
    case "CanManage":
      return ComponentState.CanManage;
    case "Managed":
      return ComponentState.Managed;
  }
};

export default (props) => {
  const gameState = useContext(GameState);
  const gameDispatch = useContext(GameDispatch);
  const accountsState = useContext(AccountsState);
  const companiesState = useContext(CompaniesState);

  const initialState = ComponentState.Intro;
  const [state, dispatch] = useReducer(reducer, initialState);

  const minManagerCost = useMemo(() => {
    let managersCost = [];
    Object.keys(companiesState).map((key) =>
      managersCost.push(companiesState[key].manager_cost)
    );
    return Math.min(...managersCost);
  }, []);

  useEffect(() => {
    if (accountsState.balance > minManagerCost) {
      dispatch({ type: "CanManage" });
    }
  }, [accountsState.balance]);

  return (
    <Box {...props}>
      <AppHead>News</AppHead>

      <Box maxWidth="30rem" m="auto" p="2rem">
        {state === ComponentState.Intro && (
          <>
            <Heading fontSize="xl" textAlign="center">
              Empire
            </Heading>

            <Box mt="2rem">
              Ride your profits all the way the top by creating companies,
              increasing profits and building a unicorn team to help you run
              your star ventures.
            </Box>

            <Box mt="2rem">
              <Flex alignItems="center" justifyContent="center">
                <Box>
                  <Image src={empire} width="4rem" />
                </Box>
                <Box px="1rem">
                  <Box fontWeight="bold">Megapreneur</Box>

                  <Box color="grey" fontSize="sm">
                    Sweet Success Inc.
                  </Box>
                </Box>
              </Flex>
              <Box textAlign="center" mt="2rem">
                <Button
                  variantColor="green"
                  size="lg"
                  onClick={() => {
                    gameDispatch({ type: "install_app", payload: "companies" });
                    dispatch({ type: "Install" });
                  }}
                >
                  INSTALL APP
                </Button>
              </Box>
            </Box>
          </>
        )}

        {state === ComponentState.Installed && (
          <Box textAlign="center">
            <Box textAlign="center" width="4rem" m="auto">
              <Image src={empire} />
            </Box>

            <Heading fontSize="xl" mt="2rem" textAlign="center">
              Megapreneur
            </Heading>

            <Box mt="1rem" fontStyle="italic">
              Installed!
            </Box>

            <Box mt="1rem">
              ...those billions aren't going to make themselves!
            </Box>
          </Box>
        )}

        {state === ComponentState.CanManage && (
          <>
            <Heading fontSize="xl" textAlign="center">
              Mega Manager
            </Heading>

            <Box mt="2rem">
              Hire Unicorn team to manage your portfolio of highly profitable
              companies.
            </Box>

            <Box mt="2rem">
              <Flex alignItems="center" justifyContent="center">
                <Box>
                  <Image src={managers} width="4rem" />
                </Box>
                <Box px="1rem">
                  <Box fontWeight="bold">Hire</Box>

                  <Box color="grey" fontSize="sm">
                    Sweet Success Inc.
                  </Box>
                </Box>
              </Flex>
              <Box textAlign="center" mt="2rem">
                <Button
                  variantColor="green"
                  size="lg"
                  onClick={() => {
                    gameDispatch({ type: "install_app", payload: "managers" });
                    dispatch({ type: "Managed" });
                  }}
                >
                  INSTALL APP
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
