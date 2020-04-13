// Reducers
import grid from "./grid";
import currentTetromino from "./currentTetromino";

const combineReducers = (reducers) => (state = {}, action) => {
  const newState = {};
  for (let key in reducers) {
    newState[key] = reducers[key](state[key], action);
  }
  return newState;
};

export default combineReducers({ grid, currentTetromino });
