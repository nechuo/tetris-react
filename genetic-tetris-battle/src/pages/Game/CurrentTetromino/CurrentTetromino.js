import React, { useContext, useEffect } from "react";

// Context
import { GameContext } from "../Game";

// Styles
import styles from "./CurrentTetromino.css";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

const CurrentTetromino = () => {
  // Hooks
  const classes = useStyles();
  const {
    game: { currentTetromino, stackedBlocks },
    dispatch,
  } = useContext(GameContext);

  // Set game 'gravity' interval
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "CURRENT_TETROMINO/MOVE_DOWN" });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Render
  return <div className={classes.container}></div>;
};

export default CurrentTetromino;
