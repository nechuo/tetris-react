// Model
import TETROMINO_SHAPE_ENUM from "../enums/tetrominoShapeEnum";

const randomInitialShape = () => {
  const shapes = Object.keys(TETROMINO_SHAPE_ENUM);
  return TETROMINO_SHAPE_ENUM[shapes[(shapes.length * Math.random()) << 0]];
};

// Tetris current tetromino initial state
export const initialState = {
  shape: randomInitialShape(),
  rotation: 0, // from 0 to 3,
  xOffset: 4, // Horizontally centered
  yOffset: 0, // Top of the grid
};

/**
 * Reducer for the tetris grid
 */
const currentTetromino = (state, action) => {
  switch (action.type) {
    case "CURRENT_TETROMINO/ROTATE_RIGHT":
      return { ...state, rotation: (state.rotation + 5) % 4 };
    case "CURRENT_TETROMINO/ROTATE_LEFT":
      // Note : 3 === -1 + 4 : always positive values for mod operator
      return { ...state, rotation: (state.rotation + 3) % 4 };
    case "CURRENT_TETROMINO/MOVE_DOWN":
      return { ...state, yOffset: state.yOffset + 1 };
    case "CURRENT_TETROMINO/MOVE_RIGHT":
      return { ...state, yOffset: state.xOffset + 1 };
    case "CURRENT_TETROMINO/MOVE_LEFT":
      return { ...state, yOffset: state.xOffset - 1 };
    default:
      return state;
  }
};

export default currentTetromino;
