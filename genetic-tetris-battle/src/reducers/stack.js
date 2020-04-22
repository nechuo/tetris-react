// Tetris stacked blocks initial state
export const initialState = {
  isGameOver: false,
  blocks: {}, // blocks will match the { x: { y1: shape1, y2: shape2, y3: shape3,..., yj: shapej } } model, in other words, stack blocks in a given column yOffset
  cleanedLines: 0,
  maxHeight: 0,
};

/**
 * Reducer for the tetris stacked blocks
 */
const stack = (state, action) => {
  switch (action.type) {
    case "STACKED_BLOCKS/STACK_TETROMINO": {
      // Stack the current tetromino blocks in the grid
      const shape = action.currentTetromino.shape;
      let isGameOver = false; // Game is over when 2 stacked blocks overlap
      const newStackedBlocks = { ...state.blocks };
      let maxHeight = state.maxHeight;

      action.currentTetromino.blocks.forEach((block) => {
        const x = block.x + action.currentTetromino.xOffset;
        const y = block.y + action.currentTetromino.yOffset;
        if (action.nbVerticalBlocks - y > maxHeight) {
          maxHeight = action.nbVerticalBlocks - y;
        }
        if (state.blocks[x] != null && state.blocks[x][y] != null) {
          isGameOver = true;
        }
        newStackedBlocks[x] =
          newStackedBlocks[x] != null
            ? {
                ...newStackedBlocks[x], // Re-use all blocks in this column,
                [y]: shape, // Add new ones !
              }
            : { [y]: shape }; // New populated column in stack
      });

      // The blocks to stack must contain the 4 blocks coordinates + shape
      return {
        ...state,
        maxHeight,
        isGameOver,
        blocks: { ...state.blocks, ...newStackedBlocks },
      };
    }

    case "STACKED_BLOCKS/CLEAR_LINES": {
      // The action data must contain the lines yCoordinates to clean
      const newStackedBlocks = {};
      const linesToClean = action.linesToClean;
      const allColumns = Object.keys(state.blocks);

      allColumns.forEach((x) => {
        const column = state.blocks[x];
        // column == ex: {5: "I", 6: "J"} (5 and 6 correspond to yOffsets here, from the top of the grid)
        const newColumn = {};
        Object.keys(column).forEach((y) => {
          const parsedY = parseInt(y);
          if (linesToClean.indexOf(parsedY) === -1) {
            // newYOffset: number of deleted lines below this block
            const newYOffset = linesToClean.filter((line) => line > parsedY)
              .length;
            newColumn[parsedY + newYOffset] = column[parsedY]; // Move the block down by 'newYOffset' blocks
          }
        });
        // Override old column with the updated one
        newStackedBlocks[x] = newColumn;
      });

      return {
        ...state,
        blocks: newStackedBlocks,
        cleanedLines: state.cleanedLines + action.linesToClean.length,
      };
    }

    case "STACKED_BLOCKS/RESET_GAME":
    case "GRID_CONFIG/CHANGE_NB_VERTICAL_BLOCKS":
    case "GRID_CONFIG/CHANGE_NB_HORIZONTAL_BLOCKS":
      return { ...initialState };

    default:
      return state;
  }
};

export default stack;
