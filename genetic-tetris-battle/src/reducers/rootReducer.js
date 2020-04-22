// Reducers
import stack from "./stack";
import gridConfig from "./gridConfig";
import currentTetromino from "./currentTetromino";

const combineReducers = (reducers) => (state = {}, action) => {
  const newState = {};
  for (let key in reducers) {
    newState[key] = reducers[key](state[key], action);
  }
  return newState;
};

export default combineReducers({ gridConfig, currentTetromino, stack });
