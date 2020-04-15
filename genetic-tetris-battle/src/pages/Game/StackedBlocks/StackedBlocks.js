import { useContext, useEffect, useMemo } from "react";

// Context
import { GameContext } from "../Game";

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

  // Nothing to return, no render
  return null;
};

export default StackedBlocks;
