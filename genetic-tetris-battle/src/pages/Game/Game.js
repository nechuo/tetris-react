import React, { createContext, useReducer } from "react";
import rootReducer from "../../reducers/rootReducer";
import intitialState from "../../reducers/initialState";
import Grid from "./Grid/Grid";
import Options from "./Options/Options";
import TetrominoBag from "./TetrominoBag/TetrominoBag";
import styles from "./Game.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);
export const GameContext = createContext();

const Game = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [game, dispatch] = useReducer(rootReducer, intitialState);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      <div className={classes.game}>
        <span
          style={{
            top: 75,
            left: 30,
            fontSize: 10,
            color: "#555555",
            position: "absolute",
          }}
        >{`Cleaned lines: ${game.stack.cleanedLines}`}</span>
        <Grid />
        <Options />
        <TetrominoBag />
      </div>
    </GameContext.Provider>
  );
};

export default Game;
