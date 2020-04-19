import React, { useContext } from "react";

// Context
import { GameContext } from "../Game";

// Components
import StackedBlocks from "./StackedBlocks/StackedBlocks";
import GhostTetromino from "./GhostTetromino/GhostTetromino";
import CurrentTetromino from "./CurrentTetromino/CurrentTetromino";

// Styles
import styles from "./Grid.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const Grid = () => {
  // Context data
  const {
    game: { gridConfig },
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  // Render
  return (
    <div className={classes.grid}>
      <StackedBlocks />
      <GhostTetromino />
      <CurrentTetromino />
    </div>
  );
};

export default Grid;
