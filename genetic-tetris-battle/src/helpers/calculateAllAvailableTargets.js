import calculateIsPossibleMove from "./calculateIsPossibleMove";

// TODO comment or refactor this method.
const calculateIsPossibleTarget = (gameSnapshot) => {
  const adjustedXOffset =
    gameSnapshot.newXOffset - gameSnapshot.currentTetromino.xOffset;

  const adjustedYOffset =
    gameSnapshot.newYOffset - gameSnapshot.currentTetromino.yOffset;

  if (
    !calculateIsPossibleMove({
      ...gameSnapshot,
      newXOffset: adjustedXOffset,
      newYOffset: adjustedYOffset,
    })
  ) {
    return false;
  } else {
    if (
      !calculateIsPossibleMove({
        ...gameSnapshot,
        newXOffset: adjustedXOffset,
        newYOffset: adjustedYOffset + 1,
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
