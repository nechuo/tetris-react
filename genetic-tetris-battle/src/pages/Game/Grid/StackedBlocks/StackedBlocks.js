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
 * Uses: stackedBlocks, grid from GameContext
 */
const StackedBlocks = () => {
  // Context data
  const {
    game: { stackedBlocks, gridConfig },
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
      const blocksOnLine = stackedBlocks.filter((block) => block.y === line);
      if (blocksOnLine.length === gridConfig.nbHorizontalBlocks)
        // If the line is full of stacked blocks
        linesToClean.push(line);
    }
    return linesToClean;
  }, [stackedBlocks, gridConfig]);

  // Clear lines of needed
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
    // Only check the top 2 lines of the grid, tetrominos spanws are 2 blocks tall (given the default rotations)
    // A game is lost when there is a collsiion between two stacked blocks
    const firstLinesStackedBlocks = stackedBlocks.filter(
      (block) => block.y >= 0 && block.y < 2
    );

    // Check if the stacked block below overlap (at least one)
    const reducedDuplicates = firstLinesStackedBlocks.reduce(
      (result, current) =>
        result.find((block) => block.x === current.x && block.y === current.y)
          ? result
          : [...result, current],
      []
    );
    if (reducedDuplicates.length !== firstLinesStackedBlocks.length)
      dispatch({
        type: "STACKED_BLOCKS/RESET_GAME",
        nbHorizontalBlocks: gridConfig.nbHorizontalBlocks, // Use to position the next tetromino xOffset
      });
  }, [dispatch, gridConfig, stackedBlocks]);

  // Render stacked blocks
  return useMemo(
    () => (
      <>
        {stackedBlocks.map((block, index) => (
          <div
            key={index}
            className={classes.stackedBlock}
            style={{
              top: block.y * gridConfig.blockSize,
              left: block.x * gridConfig.blockSize,
              backgroundColor: _shapeToColor[block.shape],
            }}
          ></div>
        ))}
      </>
    ),
    [classes, stackedBlocks, gridConfig.blockSize]
  );
};

export default StackedBlocks;
