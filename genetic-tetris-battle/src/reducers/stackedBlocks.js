// Tetris stacked blocks initial state
export const initialState = [];

/**
 * Reducer for the tetris stacked blocks
 */
const stackedBlocks = (state, action) => {
  switch (action.type) {
    case "STACKED_BLOCKS/STACK_TETROMINO": {
      // Stack the current tetromino blocks in the grid
      const blocksToStack = action.currentTetromino.blocks.map((block) => ({
        x: block.x + action.currentTetromino.xOffset, // Stacked blocks coordinates
        y: block.y + action.currentTetromino.yOffset, // include offsets
        shape: action.currentTetromino.shape, // + Also remember shape
      }));
      // The blocks to stack must contain the 4 blocks coordinates + shape
      return state.concat(blocksToStack);
    }

    case "STACKED_BLOCKS/CLEAR_LINES": {
      // The action data must contain the lines yCoordinates to clean
      const newState = state.filter(
        // Remove all the stacked blocks to clean
        (stackedBlock) => action.linesToClean.indexOf(stackedBlock.y) === -1
      );

      // Move down all remaining stacked block
      newState.forEach((stackedBlock) => {
        stackedBlock.y += action.linesToClean.filter(
          (line) => line > stackedBlock.y
        ).length;
      });
      return newState;
    }

    case "STACKED_BLOCKS/RESET_GAME":
    case "GRID/CHANGE_NB_VERTICAL_BLOCKS":
    case "GRID/CHANGE_NB_HORIZONTAL_BLOCKS":
      return [];

    default:
      return state;
  }
};

export default stackedBlocks;
