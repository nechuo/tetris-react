import React, { useContext, useEffect, useCallback, useMemo } from "react";

// Constants
import _shapeToColor from "../../../../constants/shapeToColor";

// Custom hooks / Helpers
//import useKeyboardKeys from "../../../customHooks/useKeyboardKeys";
import usePreviousState from "../../../../customHooks/usePreviousState";
import useControllerKeys from "../../../../customHooks/useControllerKeys";
import calculateIsPossibleMove from "../../../../helpers/calculateIsPossibleMove";

// Context
import { GameContext } from "../../Game";
import _shapeToBlocks from "../../../../constants/shapeToBlocks";

// Styles
import styles from "./CurrentTetromino.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

/**
 * Hook to manage the current tetromino logic (moves + rotations from keyboard inputs)
 * Stacks the current tetromino when falling down a stacked block or on the bottom edge of the grid
 *
 * Uses: currentTetromino, stackedBlocks, grid from GameContext
 */
const CurrentTetromino = () => {
  // Context data
  const {
    game: { currentTetromino, stackedBlocks, gridConfig },
    dispatch,
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  // Keyboard keys state
  const {
    isUp,
    isLeft,
    isDown,
    isRight,
    setIsDown,
    isRotateLeft,
    isRotateRight,
  } = useControllerKeys({});

  // Previous key state (from previous render)
  // Used to prevent re-renders from useEffects below
  const previousIsUp = usePreviousState(isUp);
  const previousIsLeft = usePreviousState(isLeft);
  const previousIsDown = usePreviousState(isDown);
  const previousIsRight = usePreviousState(isRight);
  const previousIsRotateLeft = usePreviousState(isRotateLeft);
  const previousIsRotateRight = usePreviousState(isRotateRight);

  // Setup tetromino 'gravity' (move down each 1s)
  useEffect(() => {
    const interval = setInterval(() => setIsDown(!isDown), 800);
    return () => clearInterval(interval);
  }, [isDown, setIsDown]);

  /**
   * checkNewMove
   *
   * Calculate if the given new tetromino offsets represent a possible move.
   * Check the reused calculateIsPossibleMove helper for more information
   *
   * useCallback: ensure that this function is re defined each time one of its dependecy changes.
   * It allows the useEffects below to also trigger when one of theses deps change.
   * That's the cost of factorising functions inside useEffects !
   */
  const checkNewMove = useCallback(
    (newXOffset, newYOffset, newTetrominoBlocks = currentTetromino.blocks) =>
      // Check if the given blocks cooridnates do not collide with an existing stacked block nor is out of the grid bounds
      calculateIsPossibleMove({
        newXOffset,
        newYOffset,
        stackedBlocks,
        currentTetromino,
        newTetrominoBlocks,
        nbVerticalBlocks: gridConfig.nbVerticalBlocks,
        nbHorizontalBlocks: gridConfig.nbHorizontalBlocks,
      }),

    [currentTetromino, stackedBlocks, gridConfig]
  );

  //=======================
  // HANDLE TETROMINO MOVES
  //=======================

  // ____________MOVE UP; IMMEDIATE FALL DOWN
  useEffect(() => {
    if (!previousIsUp && isUp) {
      // Left => newXOffset: -1; newYOffset: 0
      let newYOffset = 0;
      while (checkNewMove(0, newYOffset)) newYOffset++;
      dispatch({
        type: "STACKED_BLOCKS/STACK_TETROMINO",
        nbHorizontalBlocks: gridConfig.nbHorizontalBlocks,
        currentTetromino: {
          ...currentTetromino,
          yOffset: currentTetromino.yOffset + newYOffset - 1,
        },
      });
    }
  }, [
    isUp,
    dispatch,
    gridConfig,
    checkNewMove,
    previousIsUp,
    currentTetromino,
  ]);

  // _____________MOVE DOWN
  useEffect(() => {
    if (!previousIsDown && isDown) {
      // Down => newXOffset: 0; newYOffset: +1 (reverse Y axis)
      const isPossibleMove = checkNewMove(0, 1);
      if (isPossibleMove) {
        dispatch({ type: "CURRENT_TETROMINO/MOVE_DOWN" });
      } else {
        dispatch({
          type: "STACKED_BLOCKS/STACK_TETROMINO",
          currentTetromino,
          nbHorizontalBlocks: gridConfig.nbHorizontalBlocks,
        });
      }
    }
  }, [
    isDown,
    dispatch,
    gridConfig,
    checkNewMove,
    previousIsDown,
    currentTetromino,
  ]);

  // ____________MOVE LEFT
  useEffect(() => {
    if (!previousIsLeft && isLeft) {
      // Left => newXOffset: -1; newYOffset: 0
      const isPossibleMove = checkNewMove(-1, 0);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/MOVE_LEFT" });
    }
  }, [isLeft, previousIsLeft, checkNewMove, dispatch]);

  // _____________MOVE RIGHT
  useEffect(() => {
    if (!previousIsRight && isRight) {
      // Right => newXOffset: +1; newYOffset: 0
      const isPossibleMove = checkNewMove(1, 0);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/MOVE_RIGHT" });
    }
  }, [isRight, previousIsRight, checkNewMove, dispatch]);

  // _____________ROTATE LEFT
  useEffect(() => {
    if (!previousIsRotateLeft && isRotateLeft) {
      // Rotate left => no offsets, but new blocks ! (after rotation)
      // Note : 3 === -1 + 4 : always positive values for mod operator
      const newRotation = (currentTetromino.rotation + 3) % 4;
      const rotatedBlocks = _shapeToBlocks[currentTetromino.shape][newRotation];
      const isPossibleMove = checkNewMove(0, 0, rotatedBlocks);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/ROTATE_LEFT" });
    }
  }, [
    dispatch,
    checkNewMove,
    isRotateLeft,
    currentTetromino,
    previousIsRotateLeft,
  ]);

  // _____________ROTATE RIGHT
  useEffect(() => {
    if (!previousIsRotateRight && isRotateRight) {
      // Rotate right => no offsets, but new blocks ! (after rotation)
      // Note : 5 === +1 + 4 : always positive values for mod operator
      const newRotation = (currentTetromino.rotation + 5) % 4;
      const rotatedBlocks = _shapeToBlocks[currentTetromino.shape][newRotation];
      const isPossibleMove = checkNewMove(0, 0, rotatedBlocks);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/ROTATE_RIGHT" });
    }
  }, [
    dispatch,
    checkNewMove,
    isRotateRight,
    currentTetromino,
    previousIsRotateRight,
  ]);

  return useMemo(
    () => (
      <>
        {currentTetromino.blocks.map((block, index) => {
          // Top absolute offset in px
          const top =
            (currentTetromino.yOffset + block.y) * gridConfig.blockSize;

          // Left absolute offset in px
          const left =
            (currentTetromino.xOffset + block.x) * gridConfig.blockSize;

          return (
            <div
              key={index}
              className={classes.tetromino}
              style={{
                top,
                left,
                backgroundColor: _shapeToColor[currentTetromino.shape],
              }}
            />
          );
        })}
      </>
    ),
    [classes, currentTetromino, gridConfig.blockSize]
  );
};

export default CurrentTetromino;
