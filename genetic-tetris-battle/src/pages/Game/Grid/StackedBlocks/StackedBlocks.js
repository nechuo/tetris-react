import React, { useContext, useEffect, useMemo } from "react";

// Constants
import _shapeToColor from "../../../../constants/shapeToColor";

// Context
import { GameContext } from "../../Game";

// Styles
import styles from "./StackedBlocks.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

/**
 * Hook to manage the stacked blocks logic (clear lines when full of stacked blocks)
 *
 * Uses: stack and gridConfig from GameContext
 */
const StackedBlocks = () => {
  // Context data
  const {
    game: { stack, gridConfig },
    dispatch,
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  /**
   * Calculate all the lines to clean (completed lines).
   * Use memoization to prevent useless re-calculations if the stacked blocks do not change
   */
  const memoizedLinesToClean = useMemo(() => {
    const linesToClean = [];
    for (let line = 0; line < gridConfig.nbVerticalBlocks; line++) {
      // All stacked blocks on the current line
      const blocksOnLine = Object.values(stack.blocks).filter((column) =>
        Object.keys(column).find((yOffset) => parseInt(yOffset) === line)
      );

      if (blocksOnLine.length === gridConfig.nbHorizontalBlocks)
        // If the line is full of stacked blocks
        linesToClean.push(line);
    }
    return linesToClean;
  }, [stack, gridConfig]);

  // Clear lines if needed
  useEffect(() => {
    // Clear the completed lines ! :)
    if (memoizedLinesToClean.length > 0) {
      dispatch({
        type: "STACKED_BLOCKS/CLEAR_LINES",
        linesToClean: memoizedLinesToClean,
      });
    }
  }, [memoizedLinesToClean, dispatch]);

  // Reset game if lost
  useEffect(() => {
    // A game is lost when there is a collsiion between two stacked blocks
    if (stack.isGameOver)
      dispatch({
        type: "STACKED_BLOCKS/RESET_GAME",
        nbHorizontalBlocks: gridConfig.nbHorizontalBlocks, // Use to position the next tetromino xOffset
      });
  }, [dispatch, gridConfig.nbHorizontalBlocks, stack.isGameOver]);

  // Render stacked blocks
  return useMemo(
    () => (
      <>
        {Object.keys(stack.blocks).map((x) =>
          Object.keys(stack.blocks[x]).map((y) => (
            <div
              className={classes.stackedBlock}
              key={x * gridConfig.nbVerticalBlocks + y}
              style={{
                top: y * gridConfig.blockSize + 0.5,
                left: x * gridConfig.blockSize + 0.5,
                backgroundColor: _shapeToColor[stack.blocks[x][y]],
              }}
            ></div>
          ))
        )}
      </>
    ),
    [classes, stack, gridConfig]
  );
};

export default StackedBlocks;
