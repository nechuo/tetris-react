// Tetris grid initial state
export const initialState = {
  blockSize: 13,
  nbVerticalBlocks: 70,
  nbHorizontalBlocks: 40,
};

/**
 * Reducer for the tetris grid configuration
 */
const gridConfig = (state, action) => {
  switch (action.type) {
    case "GRID_CONFIG/CHANGE_NB_VERTICAL_BLOCKS":
      return { ...state, nbVerticalBlocks: action.nbVerticalBlocks };
    case "GRID_CONFIG/CHANGE_NB_HORIZONTAL_BLOCKS":
      return { ...state, nbHorizontalBlocks: action.nbHorizontalBlocks };
    case "GRID_CONFIG/CHANGE_BLOCK_SIZE":
      return { ...state, blockSize: action.blockSize };
    default:
      return state;
  }
};

export default gridConfig;
