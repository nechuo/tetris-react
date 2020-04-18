import React, { useContext } from "react";

// Constant
import _shapeToColor from "../../../constants/shapeToColor";

// Custom hooks / Helpers
import calculateIsPossibleMove from "../../../helpers/calculateIsPossibleMove";

// Context
import { GameContext } from "../Game";

// Styles
import styles from "./GhostTetromino.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const GhostTetromino = () => {
  // Context Data
  const {
    game: { currentTetromino, stackedBlocks, grid },
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, grid });

  // Methods

  /**
   * calcGhostYOffset
   * Check the reused calculateIsPossibleMove helper for more information
   *
   * Similar logic as 'stack tetromino' when pressing the up key.
   * Tries to virtually fall down the current tetromino until
   * it reaches either the bottom of the grid or a previously stacked block in the grid
   *
   * TODO (optimize this function: instead of trying to fall down the tetromino n times,
   * just read the stacked blocks and find the highest one that matches one of the x coordinate of the current tetromino block)
   *
   */
  const calcGhostYOffset = () => {
    let newYOffset = 0;
    // Try to move the virtual
    while (
      calculateIsPossibleMove({
        newYOffset,
        stackedBlocks,
        currentTetromino,
        nbVerticalBlocks: grid.nbVerticalBlocks,
        nbHorizontalBlocks: grid.nbHorizontalBlocks,
      })
    ) {
      newYOffset++;
    }
    return currentTetromino.yOffset + newYOffset - 1;
  };

  // Render
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {currentTetromino.blocks.map((block, index) => {
          return (
            <div
              key={index}
              className={classes.tetromino}
              style={{
                backgroundColor: _shapeToColor[currentTetromino.shape],
                left: (currentTetromino.xOffset + block.x) * 40 + 2,
                top: (calcGhostYOffset() + block.y) * 40 + 4,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default GhostTetromino;
