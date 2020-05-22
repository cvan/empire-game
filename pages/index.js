import Head from "next/head";
import Balance from "../components/Balance";
import Companies from "../components/Companies";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { theme } from "@chakra-ui/core";
import React from "react";

import Container from "../containers/Container";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <div className="container">
        <Head>
          <title>Empire</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Empire</h1>
        </main>

        <Container>
          <Balance />
          <Companies />
        </Container>

        <footer>by Casey Yee</footer>

        <style jsx>{`
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}
