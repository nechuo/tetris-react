/**
 * Given the new offsets, stackedBlocks, grid configuration and new
 * tetromino data, assess if any of the new tetromino block overlaps
 * and existing stacked block or is out of the grid bounds
 *
 * In other words, safe move corresponds to a given new tetromino blocks that matches the tetris rules
 */
const calculateIsPossibleMove = ({
  stackedBlocks,
  currentTetromino,
  nbVerticalBlocks,
  nbHorizontalBlocks,
  newYOffset = 0, // 0 by default
  newXOffset = 0, // 0 by default
  newTetrominoBlocks = currentTetromino.blocks, // CurrentTetromino blocks by default
}) => {
  // Check if the new offsets do not imply tetromino block outside the grid field
  const isOutOfGrid = newTetrominoBlocks.find(
    (block) =>
      block.x + currentTetromino.xOffset + newXOffset < 0 || // Grid left bound
      block.x + currentTetromino.xOffset + newXOffset >= nbHorizontalBlocks || // Grid right bound
      block.y + currentTetromino.yOffset + newYOffset >= nbVerticalBlocks // Grid bottom bound
  );

  // Check if the new offsets do not imply collision with an existing stacked block in the grid
  const isOverlapStackedBlock = stackedBlocks.find((stackedBlock) =>
    newTetrominoBlocks.find(
      (block) =>
        block.x + currentTetromino.xOffset + newXOffset === stackedBlock.x && // X coordinate match
        block.y + currentTetromino.yOffset + newYOffset === stackedBlock.y // Y coordinate match
    )
  );

  // Is it a safe move ? :)
  return !isOutOfGrid && !isOverlapStackedBlock;
};
export default calculateIsPossibleMove;