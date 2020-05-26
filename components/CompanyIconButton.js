import { motion } from "framer-motion";
import { Box, Image } from "@chakra-ui/core";
import BoxButton from "./BoxButton";

const CompanyIcon = ({ src, ...props }) => (
  <Box objectFit="cover" {...props}>
    <Image src={src} />
  </Box>
);

export default ({
  icon,
  size = 5,
  progress = 1,
  hasProgress,
  onClick,
  animationControl,
  ...props
}) => {
  const sizedWithProgress = hasProgress ? size + progress : size;
  const offsetWithProgress = hasProgress ? (size + progress - size) / 2 : 0;

  return (
    <BoxButton
      onClick={onClick}
      position="relative"
      height={`${sizedWithProgress}rem`}
      width={`${sizedWithProgress}rem`}
      margin="auto"
      {...props}
    >
      <div
        style={{
          position: "relative",
          width: `${sizedWithProgress}rem`,
          height: `${sizedWithProgress}rem`,
          borderRadius: `${sizedWithProgress / 2}rem`,
          overflow: "hidden"
        }}
      >
        <motion.div
          id="selling-progress"
          animate={animationControl}
          style={{
            background: "#afbeca",
            width: "100%",
            height: "100%"
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: `${size}rem`,
          height: `${size}rem`,
          top: `${offsetWithProgress}rem`,
          left: `${offsetWithProgress}rem`,
          borderRadius: `${size / 2}rem`,
          overflow: "hidden"
        }}
      >
        <CompanyIcon src={icon} width="100%" height="100%" />
      </div>
    </BoxButton>
  );
};
