import React, { useContext, useEffect, useMemo } from "react";

// Constants
import _shapeToColor from "../../../constants/shapeToColor";

// Context
import { GameContext } from "../Game";

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
    game: { stackedBlocks, grid },
    dispatch,
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, grid });

  /**
   * Calculate all the lines to clean (completed lines).
   * Use memoization to prevent useless re-calculations if the stacked blocks do not change
   */
  const memoizedLinesToClean = useMemo(() => {
    const linesToClean = [];
    for (let line = 0; line < grid.nbVerticalBlocks; line++) {
      // All stacked blocks on the current line
      const blocksOnLine = stackedBlocks.filter((block) => block.y === line);
      if (blocksOnLine.length === grid.nbHorizontalBlocks)
        // If the line is full of stacked blocks
        linesToClean.push(line);
    }
    return linesToClean;
  }, [stackedBlocks, grid]);

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
    const firstLineStackedBlocksXCoord = stackedBlocks
      .filter((block) => block.y === 0)
      .map((block) => block.x);

    if (
      firstLineStackedBlocksXCoord.length !==
      new Set(firstLineStackedBlocksXCoord).size
    ) {
      dispatch({
        type: "STACKED_BLOCKS/RESET_GAME",
      });
    }
  });

  // Nothing to return, no render
  return useMemo(
    () => (
      <div className={classes.container}>
        <div className={classes.grid}>
          {stackedBlocks.map((block, index) => {
            return (
              <div
                key={index}
                className={classes.stackedBlock}
                style={{
                  backgroundColor: _shapeToColor[block.shape],
                  top: block.y * 40 + 3,
                  left: block.x * 40 + 1,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    ),
    [classes, stackedBlocks]
  );
};

export default StackedBlocks;
