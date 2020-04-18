import React, { useContext, useMemo, useCallback } from "react";

// Context
import { GameContext } from "../Game";

// UI
import { InputNumber } from "antd";

// Styles
import styles from "./Options.css";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

const Options = () => {
  // Styles
  const classes = useStyles();

  // Context data
  const {
    game: { grid },
    dispatch,
  } = useContext(GameContext);

  // Methods
  const handleChangeNbHorizontalBlocks = useCallback(
    (newValue) => {
      newValue >= 10 &&
        newValue <= 250 &&
        dispatch({
          type: "GRID/CHANGE_NB_HORIZONTAL_BLOCKS",
          nbHorizontalBlocks: newValue,
        });
    },
    [dispatch]
  );

  const handleChangeNbVerticalBlocks = useCallback(
    (newValue) => {
      newValue >= 10 &&
        newValue <= 125 &&
        dispatch({
          type: "GRID/CHANGE_NB_VERTICAL_BLOCKS",
          nbVerticalBlocks: newValue,
          nbHorizontalBlocks: grid.nbHorizontalBlocks,
        });
    },
    [dispatch, grid.nbHorizontalBlocks]
  );

  return useMemo(
    () => (
      <div className={classes.options}>
        <div style={{ marginTop: 15 }}>
          <span style={{ color: "#888888" }}>
            Change nb of vertical blocks :{" "}
          </span>
          <InputNumber
            min={10}
            max={125}
            value={grid.nbVerticalBlocks}
            onChange={handleChangeNbVerticalBlocks}
            onPressEnter={handleChangeNbVerticalBlocks}
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <span style={{ color: "#888888" }}>
            Change nb of horizontal blocks :{" "}
          </span>
          <InputNumber
            min={10}
            max={250}
            value={grid.nbHorizontalBlocks}
            onChange={handleChangeNbHorizontalBlocks}
            onPressEnter={handleChangeNbHorizontalBlocks}
          />
        </div>
      </div>
    ),
    [
      grid,
      classes,
      handleChangeNbVerticalBlocks,
      handleChangeNbHorizontalBlocks,
    ]
  );
};

export default Options;
