import Head from "next/head";
import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { theme, Link, Box, Flex } from "@chakra-ui/core";
import OSMenu from "../components/OSMenu";
import Container from "../containers/Container";
import Balance from "../components/Balance";
import Apps from "../components/Apps";
import Dock from "../components/Dock";
import customTheme from "../theme";
import sfWallpaper from "../images/wallpaper.jpg";

export default function Home() {
  return (
    <>
      <ThemeProvider
        theme={{
          ...theme,
          customTheme,
        }}
      >
        <CSSReset />

        <Head>
          <title>Empire OS</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box padding={["0", "0", "1rem"]} width="100%" height="100%">
          <Container>
            <Box
              background="#efefef"
              width="100%"
              height="100%"
              position="relative"
              borderRadius="1rem"
              overflow="hidden"
            >
              <Flex
                flexDirection="column"
                backgroundImage={`url(${sfWallpaper})`}
                backgroundSize="cover"
                backgroundColor="rgba(0,0,0,0.6)"
                height="100%"
              >
                <OSMenu>Empire OS</OSMenu>
                <Balance />
                <Apps />
              </Flex>
              <Dock />
            </Box>
          </Container>
        </Box>

        {/* <footer>
          Casey Yee, inspired by&nbsp;
          <Link
            href="http://en.gameslol.net/adventure-capitalist-1086.html"
            isExternal
          >
            AdVenture Capitalist
          </Link>
        </footer> */}
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
          font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue",
            "Helvetica", "Arial", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: #000;
        }
      `}</style>
    </>
  );
}
