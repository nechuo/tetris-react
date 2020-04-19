// Model
import TETROMINO_SHAPE_ENUM from "../enums/tetrominoShapeEnum";

// Constants
import _shapeToBlocks from "../constants/shapeToBlocks";
import { initialState as gridInitialState } from "./gridConfig";

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

// Always have 2 bags of all the 7 tetrominos
// in the store (used to display the next tetrominos)
const createTetrominosBag = () => [
  ...shuffle(Object.keys(TETROMINO_SHAPE_ENUM)),
  ...shuffle(Object.keys(TETROMINO_SHAPE_ENUM)),
];

const initialTetrominosBag = createTetrominosBag();
// Shift the first shape
const initialShape = initialTetrominosBag.shift();

// Tetris current tetromino initial state
export const initialState = {
  shape: initialShape,
  rotation: 0, // from 0 to 3,
  yOffset: 0, // Top of the grid
  tetrominosBag: initialTetrominosBag,
  blocks: _shapeToBlocks[initialShape][0], // Allows more readable in components, not mandatory to store the blocks here
  xOffset: Math.floor(gridInitialState.nbHorizontalBlocks / 2) - 1, // Horizontally centered
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
      // If the first of the 2 bags is enmpty, append a second new one to the stored bag
      // Used to simulate a continuity in the next tetromino area
      const tetrominosBag =
        state.tetrominosBag.length > 7
          ? state.tetrominosBag
          : [
              ...state.tetrominosBag,
              ...shuffle(Object.keys(TETROMINO_SHAPE_ENUM)),
            ];
      const shape = tetrominosBag.shift();

      return {
        ...initialState,
        shape,
        tetrominosBag,
        blocks: _shapeToBlocks[shape][0],
        xOffset: Math.floor(action.nbHorizontalBlocks / 2) - 1,
      };
    }

    case "GRID_CONFIG/CHANGE_NB_VERTICAL_BLOCKS":
    case "GRID_CONFIG/CHANGE_NB_HORIZONTAL_BLOCKS":
    case "STACKED_BLOCKS/RESET_GAME": {
      const tetrominosBag = createTetrominosBag();
      const shape = tetrominosBag.shift();

      return {
        ...initialState,
        shape,
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
