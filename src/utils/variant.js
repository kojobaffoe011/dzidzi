// import { Variants } from "framer-motion";

export const fadeIn = {
  //   return {
  initial: {
    y: 0,
    opacity: 0,
  },
  animate: {
    y: 10,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  //   };
};

export const fadeOut = {
  //   return {
  initial: {
    y: 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeIn",
    },
  },
  //   };
};
