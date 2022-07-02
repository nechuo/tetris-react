import React, { useContext } from "react";
import _shapeToColor from "../../../../constants/shapeToColor";
import calculateIsPossibleMove from "../../../../helpers/calculateIsPossibleMove";
import { GameContext } from "../../Game";
import styles from "./GhostTetromino.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

/**
 * Gives a hint on where the current tetromino would fall.
 */
const GhostTetromino = () => {
  const {
    game: { currentTetromino, stack, gridConfig },
  } = useContext(GameContext);

  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  /**
   * Calculates where the current tetromino is located.
   * To do so, it tries to virtually fall down the current tetromino until it reaches either the bottom of the grid or a stacked block.
   *
   * TODO (optimize this function: instead of trying to fall down the tetromino n times,
   * just read the stacked blocks and find the highest one that matches one of the x coordinate of the current tetromino block)
   */
  const calcGhostYOffset = () => {
    let newYOffset = 0;
    while (
      calculateIsPossibleMove({
        newYOffset,
        ...gridConfig,
        currentTetromino,
        stackedBlocks: stack.blocks,
      })
    ) {
      newYOffset++;
    }
    return currentTetromino.yOffset + newYOffset - 1;
  };

  const ghostOffset = calcGhostYOffset();

  return (
    <>
      {ghostOffset >= 2 &&
        // Do not draw the ghost tetromino if the player is about to lose the game.
        currentTetromino.blocks.map((block, index) => {
          const top = (ghostOffset + block.y) * gridConfig.blockSize + 0.5;
          const left =
            (currentTetromino.xOffset + block.x) * gridConfig.blockSize + 0.5;
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
    </>
  );
};

export default GhostTetromino;
