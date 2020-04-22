// Helpers
import calculateIsPossibleMove from "./calculateIsPossibleMove";

const calculateIsPossibleTarget = (gameSnapshot) => {
  // Readjust the currentTetromino xOffset to start from the left of the grid
  const readjustedXOffset =
    gameSnapshot.newXOffset - gameSnapshot.currentTetromino.xOffset;

  // Same for yOffset: start the comparison from the top of the grid and no the current tetromino yOffset
  const readjustedYOffset =
    gameSnapshot.newYOffset - gameSnapshot.currentTetromino.yOffset;

  if (
    // Test current tetromino coordinates
    !calculateIsPossibleMove({
      ...gameSnapshot,
      newXOffset: readjustedXOffset,
      newYOffset: readjustedYOffset,
    })
  ) {
    // Current tetromino position either collides with a stacked block or is out of the grid bounds
    return false;
  } else {
    // Ok, current position matches the games rules, so check if
    if (
      !calculateIsPossibleMove({
        ...gameSnapshot,
        newXOffset: readjustedXOffset,
        newYOffset: readjustedYOffset + 1,
      })
    ) {
      return true;
    }
  }
};

/**
 * calculateAllAvailableTargets
 *
 * Given a tetromino, a grid config, and the stacked blocks, test all the
 * available tetromino positions on the stack that matches the tetris rules.
 * The idea is to chose the next target position from the resulting array of this function
 *
 * Depends on calculateIsPossibleMove
 */
const calculateAllAvailableTargets = ({
  stackedBlocks, // ex { 5: { 7: "I", 8: "L" } } => 5 represents the xOffset, 7 and 8 the yOffsets
  maxStackHeight,
  nbVerticalBlocks,
  nbHorizontalBlocks,
  currentTetromino, // { blocks, shape, roration, xOffset, yOffset },
  allTetrominoCoordinates, // Contains all available tetromino coordinates (used to rotate the tetromino)
}) => {
  // Results
  const allPossibleTargets = [];

  // Optimization: start the calculation from the top of the stack (minus tetromino height <=> 2 blocks)
  const startYOffset = nbVerticalBlocks - maxStackHeight - 2;

  for (let newXOffset = 0; newXOffset < nbHorizontalBlocks; newXOffset++) {
    for (
      let newYOffset = startYOffset;
      newYOffset < nbVerticalBlocks;
      newYOffset++
    ) {
      for (let newRotation = 0; newRotation < 4; newRotation++) {
        const newTetrominoBlocks = allTetrominoCoordinates[newRotation];
        if (
          calculateIsPossibleTarget({
            newYOffset,
            newXOffset,
            stackedBlocks,
            currentTetromino,
            nbVerticalBlocks,
            nbHorizontalBlocks,
            newTetrominoBlocks,
          })
        ) {
          // Push the current tested avialable target
          allPossibleTargets.push({
            ...currentTetromino,
            yOffset: newYOffset,
            xOffset: newXOffset,
            rotation: newRotation,
            blocks: newTetrominoBlocks,
          });
        }
      }
    }
  }
  return allPossibleTargets;
};

export default calculateAllAvailableTargets;
