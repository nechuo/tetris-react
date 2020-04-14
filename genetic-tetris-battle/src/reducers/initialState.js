// Initial States
import { initialState as gridInitialState } from "./grid";
import { initialState as stackedBlocksInitialState } from "./stackedBlocks";
import { initialState as currentTetrominoInitialState } from "./currentTetromino";

// Combine all intial states defained in reducers (for more readability)
const combinedInitialStates = {
  grid: gridInitialState,
  stackedBlocks: stackedBlocksInitialState,
  currentTetromino: currentTetrominoInitialState,
};

export default combinedInitialStates;
