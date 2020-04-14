// Model
import TETROMINO_SHAPE_ENUM from "../enums/tetrominoShapeEnum";

/**
 * Shuffles array in place.
 * @param a items An array containing the items.
 */
const shuffle = (a) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

const initialTetrominosBag = shuffle(Object.keys(TETROMINO_SHAPE_ENUM));

// Tetris current tetromino initial state
export const initialState = {
  tetrominosBag: initialTetrominosBag,
  shape: initialTetrominosBag.pop(),
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

    case "CURRENT_TETROMINO/CHANGE_TETROMINO": {
      const tetrominosBag =
        state.tetrominosBag.length > 0
          ? state.tetrominosBag
          : shuffle(Object.keys(TETROMINO_SHAPE_ENUM));
      const newShape = tetrominosBag.splice(
        Math.floor(Math.random() * tetrominosBag.length),
        1
      );
      return { ...state, shape: newShape, tetrominosBag };
    }
    default:
      return state;
  }
};

export default currentTetromino;
