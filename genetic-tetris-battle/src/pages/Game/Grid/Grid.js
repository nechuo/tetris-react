import React, { useContext } from "react";
import { GameContext } from "../Game";
import StackedBlocks from "./StackedBlocks/StackedBlocks";
import GhostTetromino from "./GhostTetromino/GhostTetromino";
import CurrentTetromino from "./CurrentTetromino/CurrentTetromino";
import styles from "./Grid.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const Grid = () => {
  const {
    game: { gridConfig },
  } = useContext(GameContext);
  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  return (
    <div className={classes.grid}>
      <StackedBlocks />
      <GhostTetromino />
      <CurrentTetromino />
    </div>
  );
};

export default Grid;
