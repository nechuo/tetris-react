// Tetris stacked blocks initial state
export const initialState = [];

/**
 * Reducer for the tetris stacked blocks
 */
const stackedBlocks = (state, action) => {
  switch (action.type) {
    case "STACKED_BLOCKS/STACK_TETROMINO":
      // The action data must contain the 4 blocks coordinates + colors to stack
      return state.concat(action.tetrominoBlocks);

    case "STACKED_BLOCKS/CLEAN_LINES": {
      // The action data must contain the lines yCoordinates to clean
      const newState = state.filter(
        // Remove all the stacked blocks to clean
        (stackedBlock) => action.linesToClean.indexOf(stackedBlock.y) === -1
      );

      // Move down all remaining stacked block
      newState.forEach(
        (stackedBlock) => (stackedBlock.y += action.linesToClean.length)
      );
      return newState;
    }

    case "STACKED_BLOCKS/RESET_STACK":
      return [];

    default:
      return state;
  }
};

export default stackedBlocks;
