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
          customTheme
        }}
      >
        <CSSReset />
        <Head>
          <title>Empire OS</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="theme-color" content="#000" />
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

          /* Disable prompt upon long-tapping on iOS. */
          -webkit-touch-callout: none;

          /* Disable text-cursor highlighting on iOS. */
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          /* Disable text-cursor highlighting on tap on iOS. */
          -webkit-highlight: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

          /* Disable tap-to-zoom on iOS. */
          touch-action: none;

          /* Prevent page from scrolling vertically. */
          position: fixed;
        }

        input,
        textarea {
          /* Re-enable text-cursor selection on iOS. */
          -webkit-user-select: text;
        }

        .clearfix::after {
          clear: both;
          content: "";
          display: table;
        }

        .box-say {
          padding-top: 1px;
        }

        .box-say + .box-reply {
          padding-top: 6px;
        }

        .box-reply + .box-say {
          padding-top: 8px;
        }

        .bubble.reply.reply-freeform {
          margin-bottom: 2px;
        }
      `}</style>
    </>
  );
}
