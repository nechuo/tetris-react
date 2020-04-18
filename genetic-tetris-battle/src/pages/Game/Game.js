import React, { createContext, useReducer } from "react";

// Reducers
import rootReducer from "../../reducers/rootReducer";
import intitialState from "../../reducers/initialState";

// Components
import Grid from "./Grid/Grid";
import Options from "./Options/Options";
import StackedBlocks from "./StackedBlocks/StackedBlocks";
import GhostTetromino from "./GhostTetromino/GhostTetromino";
import CurrentTetromino from "./CurrentTetromino/CurrentTetromino";

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

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      <div className={classes.container}>
        <Grid />
        <Options />
        <StackedBlocks />
        <GhostTetromino />
        <CurrentTetromino />
      </div>
    </GameContext.Provider>
  );
};

export default Game;
