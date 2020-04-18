import React, { useContext, useMemo, useCallback, useState } from "react";

// Context
import { GameContext } from "../Game";

// UI
import { InputNumber, Popover, Button } from "antd";

// Styles
import styles from "./Options.css";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

// Constants
const MIN_BLOCK_SIZE = 5;
const MAX_BLOCK_SIZE = 60;
const MIN_VERTICAL_BLOCKS = 10;
const MAX_VERTICAL_BLOCKS = 230;
const MIN_HORIZONTAL_BLOCKS = 10;
const MAX_HORIZONTAL_BLOCKS = 470;

const Options = () => {
  // Styles
  const classes = useStyles();

  // Local State
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  // Context data
  const {
    game: { gridConfig },
    dispatch,
  } = useContext(GameContext);

  // Methods
  const handleChangeNbHorizontalBlocks = useCallback(
    (newValue) => {
      newValue >= MIN_HORIZONTAL_BLOCKS &&
        newValue <= MAX_HORIZONTAL_BLOCKS &&
        dispatch({
          type: "GRID_CONFIG/CHANGE_NB_HORIZONTAL_BLOCKS",
          nbHorizontalBlocks: newValue,
        });
    },
    [dispatch]
  );

  const handleChangeNbVerticalBlocks = useCallback(
    (newValue) =>
      newValue >= MIN_VERTICAL_BLOCKS &&
      newValue <= MAX_VERTICAL_BLOCKS &&
      dispatch({
        type: "GRID_CONFIG/CHANGE_NB_VERTICAL_BLOCKS",
        nbVerticalBlocks: newValue,
        nbHorizontalBlocks: gridConfig.nbHorizontalBlocks,
      }),
    [dispatch, gridConfig.nbHorizontalBlocks]
  );

  const handleChangeBlockSize = useCallback(
    (newValue) =>
      newValue >= MIN_BLOCK_SIZE &&
      newValue <= MAX_BLOCK_SIZE &&
      dispatch({ type: "GRID_CONFIG/CHANGE_BLOCK_SIZE", blockSize: newValue }),
    [dispatch]
  );

  /**
   * Render the options popo
   */
  const renderPopoverContent = useMemo(
    () => (
      <div className={classes.options}>
        <div className={classes.optionWrapper}>
          <span className={classes}>
            {`Change nb of vertical blocks (from ${MIN_VERTICAL_BLOCKS} to ${MAX_VERTICAL_BLOCKS}): `}
          </span>
          <InputNumber
            min={MIN_VERTICAL_BLOCKS}
            max={MAX_VERTICAL_BLOCKS}
            value={gridConfig.nbVerticalBlocks}
            onChange={handleChangeNbVerticalBlocks}
            onPressEnter={handleChangeNbVerticalBlocks}
          />
        </div>
        <div className={classes.optionWrapper}>
          <span className={classes.optionLabel}>
            {`Change nb of horizontal blocks (from ${MIN_HORIZONTAL_BLOCKS} to ${MAX_HORIZONTAL_BLOCKS}): `}
          </span>
          <InputNumber
            min={MIN_HORIZONTAL_BLOCKS}
            max={MAX_HORIZONTAL_BLOCKS}
            value={gridConfig.nbHorizontalBlocks}
            onChange={handleChangeNbHorizontalBlocks}
            onPressEnter={handleChangeNbHorizontalBlocks}
          />
        </div>
        <div className={classes.optionWrapper}>
          <span className={classes.optionLabel}>
            {`Change block size (from ${MIN_BLOCK_SIZE} to ${MAX_BLOCK_SIZE}): `}
          </span>
          <InputNumber
            min={MIN_BLOCK_SIZE}
            max={MAX_BLOCK_SIZE}
            value={gridConfig.blockSize}
            onChange={handleChangeBlockSize}
            onPressEnter={handleChangeBlockSize}
          />
        </div>
      </div>
    ),
    [
      classes,
      gridConfig,
      handleChangeBlockSize,
      handleChangeNbVerticalBlocks,
      handleChangeNbHorizontalBlocks,
    ]
  );

  return useMemo(
    () => (
      <div className={classes.container}>
        <Popover
          trigger="click"
          placement="bottomLeft"
          visible={isPopoverVisible}
          content={renderPopoverContent}
          onVisibleChange={setIsPopoverVisible}
        >
          <Button
            className={classes.button}
            onClick={() => setIsPopoverVisible(true)}
          >
            Options
          </Button>
        </Popover>
      </div>
    ),
    [classes, isPopoverVisible, renderPopoverContent]
  );
};

export default Options;
