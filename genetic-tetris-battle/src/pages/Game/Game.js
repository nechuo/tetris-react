import React, { createContext, useReducer, useEffect } from "react";

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
  console.log("render");
  // Hooks
  const classes = useStyles();
  const [game, dispatch] = useReducer(rootReducer, intitialState);

  // Set game 'gravity' interval
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "CURRENT_TETROMINO/MOVE_DOWN" });
    }, 1500);
    return () => clearInterval(interval);
  });

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      <div className={classes.container}>
        <Grid />
      </div>
    </GameContext.Provider>
  );
};

export default Game;
