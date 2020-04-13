import React, { createContext, useReducer, useMemo } from "react";

// Reducers
import rootReducer from "../../reducers/rootReducer";
import intitialState from "../../reducers/initialState";

// Components
import Grid from "./Grid/Grid";

// Styles
import styles from "./Game.css";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

// Context
export const GameContext = createContext();

const Game = () => {
  // Hooks
  const classes = useStyles();
  const [game, dispatch] = useReducer(rootReducer, intitialState);

  // Memoize reducer state to enhance performance
  const contextValue = useMemo(() => ({ game, dispatch }), [game]);

  return (
    <GameContext.Provider value={contextValue}>
      <div className={classes.container}>
        <Grid />
      </div>
    </GameContext.Provider>
  );
};

export default Game;
