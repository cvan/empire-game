import { Box } from "@chakra-ui/core";
import styles from "./Chat.module.css";
import AppHead from "./AppHead";

const Say = ({ children, typing }) => {
  return (
    <div
      className={[styles.bubble, styles.say]}
      style={{
        width: "14rem",
      }}
    >
      <span className={styles["bubble-content"]}>{children}</span>
    </div>
  );
};

const Reply = ({ children, typing }) => {
  return (
    <div
      className={[
        styles.bubble,
        styles.reply,
        styles["reply-freeform"],
        styles.say,
      ]}
    >
      <span className={styles["bubble-content"]}>
        <span className="bubble-button bubble-pick">{children}</span>
      </span>
    </div>
  );
};

export default (props) => {
  return (
    <Box {...props}>
      <AppHead>Chat</AppHead>
      <div className={styles["bubble-container"]}>
        <div className={styles["bubble-wrap"]}>
          <Say>Saying something</Say>
          <Say>Shhhhh! You know nuthin!</Say>
          {/* <Say typing={true} /> */}
          <Reply>Replying to you</Reply>
          <Reply>Try again</Reply>
        </div>
      </div>
    </Box>
  );
};
