// Initial States
import { initialState as gridInitialState } from "./grid";

// Combine all intial states defained in reducers (for more readability)
const combinedInitialStates = {
  grid: gridInitialState,
};

export default combinedInitialStates;
