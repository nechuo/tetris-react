import React, { useContext, useMemo } from "react";

// Context
import { GameContext } from "../Game";

// Styles
import styles from "./Grid.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const Grid = () => {
  // Context data
  const {
    game: { grid },
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, grid });

  // Render
  return useMemo(
    () => (
      <div className={classes.container}>
        <div className={classes.grid}></div>
      </div>
    ),
    [classes]
  );
};

export default Grid;
