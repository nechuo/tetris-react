import React from "react";

// Styles
import styles from "./Stack.css";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

const Stack = () => {
  // Hooks
  const classes = useStyles();

  return <div className={classes.container}></div>;
};

export default Stack;
