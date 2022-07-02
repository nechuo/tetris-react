/**
 *Check if the tetromino fits in the grid.
 */
const calculateIsPossibleMove = ({
  // For example: { 5: { 7: "I" } } => 5 represents the horizontal offest, 7 the vertical offset.
  stackedBlocks,
  currentTetromino,
  nbVerticalBlocks,
  nbHorizontalBlocks,
  newYOffset = 0, // Default value.
  newXOffset = 0, // Default value.
  newTetrominoBlocks = currentTetromino.blocks, // Default value.
}) => {
  const isOutOfGrid = newTetrominoBlocks.find(
    (block) =>
      block.x + currentTetromino.xOffset + newXOffset < 0 || // Grid left bound
      block.x + currentTetromino.xOffset + newXOffset >= nbHorizontalBlocks || // Grid right bound
      block.y + currentTetromino.yOffset + newYOffset >= nbVerticalBlocks || // Grid bottom bound
      block.y + currentTetromino.yOffset + newYOffset < 0 // Grid top bound
  );
  const isOverlapStackedBlock = newTetrominoBlocks.find((block) => {
    const newX = block.x + currentTetromino.xOffset + newXOffset;
    const newY = block.y + currentTetromino.yOffset + newYOffset;
    return stackedBlocks[newX] && stackedBlocks[newX][newY] != null;
  });
  return !isOutOfGrid && !isOverlapStackedBlock;
};
export default calculateIsPossibleMove;
