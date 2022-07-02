import React, { useContext, useEffect, useMemo } from "react";
import _shapeToColor from "../../../../constants/shapeToColor";
import { GameContext } from "../../Game";
import styles from "./StackedBlocks.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

/**
 * Clears all the full lines.
 */
const StackedBlocks = () => {
  const {
    game: { stack, gridConfig },
    dispatch,
  } = useContext(GameContext);

  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  // Finds all the full lines to clear.
  const memoizedLinesToClean = useMemo(() => {
    const linesToClean = [];
    for (let line = 0; line < gridConfig.nbVerticalBlocks; line++) {
      const blocksOnLine = Object.values(stack.blocks).filter((column) =>
        Object.keys(column).find((yOffset) => parseInt(yOffset) === line)
      );

      if (blocksOnLine.length === gridConfig.nbHorizontalBlocks)
        linesToClean.push(line);
    }
    return linesToClean;
  }, [stack, gridConfig]);

  // Clear the full lines.
  useEffect(() => {
    if (memoizedLinesToClean.length > 0) {
      dispatch({
        type: "STACKED_BLOCKS/CLEAR_LINES",
        linesToClean: memoizedLinesToClean,
      });
    }
  }, [memoizedLinesToClean, dispatch]);

  // Reset game if it's over.
  useEffect(() => {
    if (stack.isGameOver)
      dispatch({
        type: "STACKED_BLOCKS/RESET_GAME",
        nbHorizontalBlocks: gridConfig.nbHorizontalBlocks,
      });
  }, [dispatch, gridConfig.nbHorizontalBlocks, stack.isGameOver]);

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
