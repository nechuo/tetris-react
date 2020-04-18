import React, { createContext, useReducer } from "react";

// UI
import { InputNumber } from "antd";

// Reducers
import rootReducer from "../../reducers/rootReducer";
import intitialState from "../../reducers/initialState";

// Components
import Grid from "./Grid/Grid";
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
  const { grid } = game;

  // Methods
  const handleChangeNbHorizontalBlocks = (newValue) => {
    dispatch({
      type: "GRID/CHANGE_NB_HORIZONTAL_BLOCKS",
      nbHorizontalBlocks: newValue,
    });
  };

  const handleChangeNbVerticalBlocks = (newValue) => {
    dispatch({
      type: "GRID/CHANGE_NB_VERTICAL_BLOCKS",
      nbVerticalBlocks: newValue,
    });
  };

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      <div className={classes.container}>
        <div className={classes.options}>
          <div style={{ marginTop: 15 }}>
            <span style={{ color: "#888888" }}>
              Change nb of vertical blocks :{" "}
            </span>
            <InputNumber
              value={grid.nbVerticalBlocks}
              onChange={handleChangeNbVerticalBlocks}
            />
          </div>
          <div style={{ marginTop: 15 }}>
            <span style={{ color: "#888888" }}>
              Change nb of horizontal blocks :{" "}
            </span>
            <InputNumber
              value={grid.nbHorizontalBlocks}
              onChange={handleChangeNbHorizontalBlocks}
            />
          </div>
        </div>
        <Grid />
        <StackedBlocks />
        <GhostTetromino />
        <CurrentTetromino />
      </div>
    </GameContext.Provider>
  );
};

export default Game;
