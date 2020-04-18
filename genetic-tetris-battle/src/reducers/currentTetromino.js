// Model
import TETROMINO_SHAPE_ENUM from "../enums/tetrominoShapeEnum";

// Constants
import _shapeToBlocks from "../constants/shapeToBlocks";
import { initialState as gridInitialState } from "./grid";

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
const initialShape = initialTetrominosBag.pop();

// Tetris current tetromino initial state
export const initialState = {
  shape: initialShape,
  rotation: 0, // from 0 to 3,
  yOffset: 0, // Top of the grid
  tetrominosBag: initialTetrominosBag,
  blocks: _shapeToBlocks[initialShape][0],
  xOffset: gridInitialState.nbHorizontalBlocks / 2 - 1, // Horizontally centered
};

/**
 * Reducer for the tetris grid
 */
const currentTetromino = (state, action) => {
  switch (action.type) {
    case "CURRENT_TETROMINO/ROTATE_RIGHT":
      return {
        ...state,
        rotation: (state.rotation + 5) % 4,
        blocks: _shapeToBlocks[state.shape][(state.rotation + 5) % 4],
      };
    case "CURRENT_TETROMINO/ROTATE_LEFT":
      // Note : 3 === -1 + 4 : always positive values for mod operator
      return {
        ...state,
        rotation: (state.rotation + 3) % 4,
        blocks: _shapeToBlocks[state.shape][(state.rotation + 3) % 4],
      };
    case "CURRENT_TETROMINO/MOVE_DOWN":
      return { ...state, yOffset: state.yOffset + 1 };
    case "CURRENT_TETROMINO/MOVE_RIGHT":
      return { ...state, xOffset: state.xOffset + 1 };
    case "CURRENT_TETROMINO/MOVE_LEFT":
      return { ...state, xOffset: state.xOffset - 1 };

    case "STACKED_BLOCKS/STACK_TETROMINO": {
      const tetrominosBag =
        state.tetrominosBag.length > 0
          ? state.tetrominosBag
          : shuffle(Object.keys(TETROMINO_SHAPE_ENUM));
      const shape = tetrominosBag.pop();

      return {
        shape,
        yOffset: 0,
        rotation: 0,
        tetrominosBag,
        blocks: _shapeToBlocks[shape][0],
        xOffset: Math.floor(action.nbHorizontalBlocks / 2) - 1,
      };
    }

    case "GRID/CHANGE_NB_VERTICAL_BLOCKS":
    case "GRID/CHANGE_NB_HORIZONTAL_BLOCKS":
    case "STACKED_BLOCKS/RESET_GAME": {
      const tetrominosBag = shuffle(Object.keys(TETROMINO_SHAPE_ENUM));
      const shape = tetrominosBag.pop();
      return {
        shape,
        yOffset: 0,
        rotation: 0,
        tetrominosBag,
        blocks: _shapeToBlocks[shape][0],
        xOffset: Math.floor(action.nbHorizontalBlocks / 2) - 1,
      };
    }
    default:
      return state;
  }
};

export default currentTetromino;
