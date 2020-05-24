import Head from "next/head";
import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { theme, Link, Box, Flex } from "@chakra-ui/core";
import OSMenu from "../components/OSMenu";
import Container from "../containers/Container";
import Balance from "../components/Balance";
import Apps from "../components/Apps";
import Dock from "../components/Dock";

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSReset />

        <Head>
          <title>Empire</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="title">Empire</h1>

        <Container>
          <Box
            background="#efefef"
            width="80%"
            maxWidth="50rem"
            minWidth="27rem"
            margin="auto"
            position="relative"
            borderRadius="1rem"
            height="80vh"
            overflow="hidden"
          >
            <Flex flexDirection="column" background="lightblue" height="100%">
              <OSMenu>Empire OS</OSMenu>
              <Balance />
              <Apps />
            </Flex>
            <Dock />
          </Box>
        </Container>

        <footer>
          Casey Yee, inspired by&nbsp;
          <Link
            href="http://en.gameslol.net/adventure-capitalist-1086.html"
            isExternal
          >
            AdVenture Capitalist
          </Link>
        </footer>
      </ThemeProvider>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #__next {
          height: 100%;
          width: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue",
            "Helvetica", "Arial", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
}
