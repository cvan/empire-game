import { Box, Heading, Image, Flex, Button } from "@chakra-ui/core";
import AppHead from "./AppHead";
import empire from "../images/empire.png";
import { useContext } from "react";
import { GameDispatch, GameState } from "../containers/Container";

export default (props) => {
  const state = useContext(GameState);
  const dispatch = useContext(GameDispatch);
  return (
    <Box {...props}>
      <AppHead>News</AppHead>

      <Box maxWidth="30rem" m="auto" p="2rem">
        {!state.menu["companies"].installed ? (
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
                  onClick={() =>
                    dispatch({ type: "install_app", payload: "companies" })
                  }
                >
                  INSTALL APP
                </Button>
              </Box>
            </Box>
          </>
        ) : (
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
      </Box>
    </Box>
  );
};
