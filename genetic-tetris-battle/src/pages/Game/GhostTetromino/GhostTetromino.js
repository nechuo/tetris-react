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
    game: { currentTetromino, stackedBlocks, gridConfig },
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

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
        nbVerticalBlocks: gridConfig.nbVerticalBlocks,
        nbHorizontalBlocks: gridConfig.nbHorizontalBlocks,
      })
    ) {
      newYOffset++;
    }
    return currentTetromino.yOffset + newYOffset - 1;
  };

  const ghostOffset = calcGhostYOffset();

  // Render
  return (
    <>
      {ghostOffset >= 2 && ( // do not draw the ghost tetromino if there is not any remaining place due to the stacked blocks (or, in other words, if you are going to lose !)
        <div className={classes.ghostTetromino}>
          {currentTetromino.blocks.map((block, index) => {
            // Top absolute offset in px
            const top = (ghostOffset + block.y) * gridConfig.blockSize + 4;

            // Left absolute offset in px
            const left =
              (currentTetromino.xOffset + block.x) * gridConfig.blockSize + 1;

            return (
              <div
                key={index}
                className={classes.tetromino}
                style={{
                  top,
                  left,
                  backgroundColor: _shapeToColor[currentTetromino.shape],
                }}
              ></div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default GhostTetromino;
