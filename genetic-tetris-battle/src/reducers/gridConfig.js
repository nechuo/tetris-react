// Tetris grid initial state
export const initialState = {
  nbVerticalBlocks: 20,
  nbHorizontalBlocks: 10,
};

/**
 * Reducer for the tetris grid configuration
 */
const gridConfig = (state, action) => {
  switch (action.type) {
    case "GRID/CHANGE_NB_VERTICAL_BLOCKS":
      return { ...state, nbVerticalBlocks: action.nbVerticalBlocks };
    case "GRID/CHANGE_NB_HORIZONTAL_BLOCKS":
      return { ...state, nbHorizontalBlocks: action.nbHorizontalBlocks };
    default:
      return state;
  }
};

export default gridConfig;
