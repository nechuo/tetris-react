import React, { useContext, useMemo } from "react";

// Context
import { GameContext } from "../Game";

// Styles
import styles from "./Grid.css";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

const Grid = () => {
  // Hooks
  const classes = useStyles();
  const {
    game: {
      grid: { nbVerticalBlocks, nbHorizontalBlocks },
    },
  } = useContext(GameContext);

  // Methods
  const renderGrid = () => {
    const rects = [];
    for (let i = 0; i < nbVerticalBlocks; i++) {
      for (let j = 0; j < nbHorizontalBlocks; j++) {
        rects.push(
          <div className={classes.gridRect} key={i * nbHorizontalBlocks + j} />
        );
      }
    }
    return rects;
  };

  return useMemo(
    () => (
      <div className={classes.container}>
        <div
          className={classes.grid}
          style={{
            height: (nbVerticalBlocks + 1) * 40,
            width: (nbHorizontalBlocks + 0.5) * 40,
          }}
        >
          {renderGrid()}
        </div>
      </div>
    ),
    [nbVerticalBlocks, nbHorizontalBlocks]
  );
};

export default Grid;
