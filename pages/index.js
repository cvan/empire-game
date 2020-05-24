import Head from "next/head";
import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { theme, Link, Box } from "@chakra-ui/core";
import Container from "../containers/Container";
import Balance from "../components/Balance";
import Companies from "../components/Companies";
import Managers from "../components/Managers";
import Chat from "../components/Chat";
import Dock from "../components/Dock";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />

      <Head>
        <title>Empire</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title">Empire</h1>

      <Container>
        <Dock>
          <Balance />
          <Chat />
          <Companies />
          <Managers />
        </Dock>
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
  );
}
