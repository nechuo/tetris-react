// Initial States
import { initialState as stackInitialState } from "./stack";
import { initialState as gridInitialState } from "./gridConfig";
import { initialState as currentTetrominoInitialState } from "./currentTetromino";

// Combine all intial states defained in reducers (for more readability)
const combinedInitialStates = {
  stack: stackInitialState,
  gridConfig: gridInitialState,
  currentTetromino: currentTetrominoInitialState,
};

export default combinedInitialStates;
