import React, { useRef, useEffect, useState } from "react";
import { Box, Link } from "@chakra-ui/core";
import AppHead from "./AppHead";

const Say = ({ children, typing }) => {
  const content = useRef(null);
  const container = useRef(null);
  const [width, setWidth] = useState("14rem");

  useEffect(() => {
    if (content.current) {
      setWidth(content.current.offsetWidth + "px");
    }
  }, [content]);

  return (
    <Box>
      <div
        className="bubble say"
        ref={container}
        style={{
          whiteSpace: "nowrap",
          width,
        }}
      >
        <span className="bubble-content" ref={content}>
          {children}
        </span>
      </div>
    </Box>
  );
};

const Reply = ({ children, typing }) => {
  return (
    <Box>
      <div className="bubble reply reply-freeform say">
        <span className="bubble-content">
          <span className="bubble-button bubble-pick">{children}</span>
        </span>
      </div>
    </Box>
  );
};

// note:
// We've imported the chat styles from myzel-chat-bubble npm package.
// See /pages/_app.js for inclusion.
export default (props) => {
  const faProps = {
    style: { display: "inline-block" },
  };
  return (
    <Box {...props}>
      <AppHead background="#8dcc46">Chat</AppHead>

      <div className="bubble-container" style={{ height: "100%" }}>
        <div className="bubble-wrap">
          <Say>🤙</Say>
          <Say>
            Hey! How goes it? You have
            <br />
            the lowdown on this project?
          </Say>
          <Reply>Pretty good thanks. Yeah, here you go</Reply>
          <Reply>
            <Link href="https://github.com/caseyyee/empire-game" isExternal>
              🛠&nbsp; Empire Game Github
            </Link>
          </Reply>
          <Reply>
            Inpsired by
            <Link
              href="http://en.gameslol.net/adventure-capitalist-1086.html"
              isExternal
            >
              AdVenture Capitalist 🤑
            </Link>
          </Reply>
          <Reply>It's a pretty rad game</Reply>
          <Say>
            You should take a look
            <br />
            at Casey's Site.
          </Say>
          <Say>
            <Link href="https://github.com/caseyyee/empire-game" isExternal>
              👀 &nbsp; caseyyee.com
            </Link>
          </Say>
          <Reply>😁&nbsp;😁&nbsp;😁</Reply>
          <Reply>Cool. Will do!</Reply>

          <Say>💥</Say>
        </div>
      </div>
    </Box>
  );
};
