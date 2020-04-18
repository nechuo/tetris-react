// Tetris grid initial state
export const initialState = {
  nbVerticalBlocks: 130,
  nbHorizontalBlocks: 170,
};

/**
 * Reducer for the tetris grid
 */
const grid = (state, action) => {
  switch (action.type) {
    case "GRID/CHANGE_NB_VERTICAL_BLOCKS":
      return { ...state, nbVerticalBlocks: action.nbVerticalBlocks };
    case "GRID/CHANGE_NB_HORIZONTAL_BLOCKS":
      return { ...state, nbHorizontalBlocks: action.nbHorizontalBlocks };
    default:
      return state;
  }
};

export default grid;
