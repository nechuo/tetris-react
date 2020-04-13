import React, { useContext, useMemo } from "react";

// Constants
import _shapeToColor from "../../../constants/shapeToColor";
import _shapeToCoordinates from "../../../constants/shapeToCoordinates";

// Context
import { GameContext } from "../Game";

// Styles
import styles from "./Grid.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const Grid = () => {
  // Hooks
  const theme = useTheme();
  const classes = useStyles({ theme });
  const {
    game: {
      grid: { nbVerticalBlocks, nbHorizontalBlocks },
      currentTetromino: {
        shape,
        xOffset,
        yOffset,
        rotation, // from 0 to 3,
      },
    },
  } = useContext(GameContext);

  // Methods
  const calculateGridBlockColor = (gridBlockY, gridBlockX) => {
    const currentTetrominoCoordinates = _shapeToCoordinates[shape][rotation]; // 4 blocks !
    const matchTetrominoBlock = currentTetrominoCoordinates.find(
      (block) =>
        block.x + xOffset === gridBlockX && block.y + yOffset === gridBlockY
    );
    return matchTetrominoBlock != null ? _shapeToColor[shape] : "black";
  };

  const renderGrid = () => {
    const rects = [];
    for (let i = 0; i < nbVerticalBlocks; i++) {
      for (let j = 0; j < nbHorizontalBlocks; j++) {
        rects.push(
          <div
            className={classes.gridRect}
            key={i * nbHorizontalBlocks + j}
            style={{ backgroundColor: calculateGridBlockColor(i, j) }}
          />
        );
      }
    }
    return rects;
  };

  return (
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
  );
};

export default Grid;
