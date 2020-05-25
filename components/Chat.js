import React, { useRef, useEffect, useState } from "react";
import { Box } from "@chakra-ui/core";
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
  return (
    <Box {...props}>
      <AppHead background="#8dcc46">Chat</AppHead>
      <div className="bubble-container" style={{ height: "100%" }}>
        <div className="bubble-wrap">
          <Say>Saying something</Say>
          <Say>Shhhhh! You know nuthin!</Say>
          <Reply>Replying to you</Reply>
          <Reply>Try again</Reply>
          <Say>
            What a whack job kind of thing to say. What do you think about that?
          </Say>
          <Reply>
            Rockin' well, lets just say we should just finish this off tonite.
          </Reply>
          <Say>
            Rockin' well, lets just say we should just finish this off tonite.
          </Say>
        </div>
      </div>
    </Box>
  );
};
