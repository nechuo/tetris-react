import { useContext, useEffect, useCallback } from "react";

// Custom hooks
//import useKeyboardKeys from "../../../customHooks/useKeyboardKeys";
import usePreviousState from "../../../customHooks/usePreviousState";
import useControllerKeys from "../../../customHooks/useControllerKeys";

// Context
import { GameContext } from "../Game";
import _shapeToBlocks from "../../../constants/shapeToBlocks";

/**
 * Hook to manage the current tetromino logic (moves + rotations from keyboard inputs)
 * Stacks the current tetromino when falling down a stacked block or on the bottom edge of the grid
 *
 * Uses: currentTetromino, stackedBlocks, grid from GameContext
 */
const CurrentTetromino = () => {
  // Context data
  const {
    game: { currentTetromino, stackedBlocks, grid },
    dispatch,
  } = useContext(GameContext);

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
   * calcIfPossibleMove
   *
   * Calculate if the given new tetromino offsets represent a possible move.
   * A possible move corresponds to no tetromino block out of bounds or no tetromino block
   * overlapping a previously stacked block
   *
   * useCallback: ensure that this function is re defined each time one of its dependecy changes.
   * It allows the useEffects below to also trigger when one of theses deps change.
   * That's the cost of factorising functions inside useEffects !
   *
   * @param {*} newXOffset
   * @param {*} newYOffset
   */
  const calcIfPossibleMove = useCallback(
    (newXOffset, newYOffset, newTetrominoBlocks = currentTetromino.blocks) => {
      // Check if the new offsets do not imply tetromino block outside the grid field
      const isOutOfGrid = newTetrominoBlocks.find(
        (block) =>
          block.x + currentTetromino.xOffset + newXOffset < 0 || // Grid left bound
          block.x + currentTetromino.xOffset + newXOffset >=
            grid.nbHorizontalBlocks || // Grid right bound
          block.y + currentTetromino.yOffset + newYOffset >=
            grid.nbVerticalBlocks // Grid bottom bound
      );

      // Check if the new offsets do not imply collision with an existing stacked block in the grid
      const isOverlapStackedBlock = stackedBlocks.find((stackedBlock) =>
        newTetrominoBlocks.find(
          (block) =>
            block.x + currentTetromino.xOffset + newXOffset ===
              stackedBlock.x && // X coordinate match
            block.y + currentTetromino.yOffset + newYOffset === stackedBlock.y // Y coordinate match
        )
      );

      // Is it a safe move ? :)
      return !isOutOfGrid && !isOverlapStackedBlock;
    },
    [currentTetromino, stackedBlocks, grid]
  );

  //=======================
  // HANDLE TETROMINO MOVES
  //=======================

  // ____________MOVE UP; IMMEDIATE FALL DOWN
  useEffect(() => {
    if (!previousIsUp && isUp) {
      // Left => newXOffset: -1; newYOffset: 0
      let newYOffset = 0;
      while (calcIfPossibleMove(0, newYOffset)) newYOffset++;
      dispatch({
        type: "STACKED_BLOCKS/STACK_TETROMINO",
        currentTetromino: {
          ...currentTetromino,
          yOffset: currentTetromino.yOffset + newYOffset - 1,
        },
      });
    }
  }, [isUp, previousIsUp, calcIfPossibleMove, dispatch, currentTetromino]);

  // _____________MOVE DOWN
  useEffect(() => {
    if (!previousIsDown && isDown) {
      // Down => newXOffset: 0; newYOffset: +1 (reverse Y axis)
      const isPossibleMove = calcIfPossibleMove(0, 1);
      if (isPossibleMove) {
        dispatch({ type: "CURRENT_TETROMINO/MOVE_DOWN" });
      } else {
        dispatch({ type: "STACKED_BLOCKS/STACK_TETROMINO", currentTetromino });
      }
    }
  }, [isDown, previousIsDown, calcIfPossibleMove, dispatch, currentTetromino]);

  // ____________MOVE LEFT
  useEffect(() => {
    if (!previousIsLeft && isLeft) {
      // Left => newXOffset: -1; newYOffset: 0
      const isPossibleMove = calcIfPossibleMove(-1, 0);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/MOVE_LEFT" });
    }
  }, [isLeft, previousIsLeft, calcIfPossibleMove, dispatch]);

  // _____________MOVE RIGHT
  useEffect(() => {
    if (!previousIsRight && isRight) {
      // Right => newXOffset: +1; newYOffset: 0
      const isPossibleMove = calcIfPossibleMove(1, 0);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/MOVE_RIGHT" });
    }
  }, [isRight, previousIsRight, calcIfPossibleMove, dispatch]);

  // _____________ROTATE LEFT
  useEffect(() => {
    if (!previousIsRotateLeft && isRotateLeft) {
      // Rotate left => no offsets, but new blocks ! (after rotation)
      // Note : 3 === -1 + 4 : always positive values for mod operator
      const newRotation = (currentTetromino.rotation + 3) % 4;
      const rotatedBlocks = _shapeToBlocks[currentTetromino.shape][newRotation];
      const isPossibleMove = calcIfPossibleMove(0, 0, rotatedBlocks);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/ROTATE_LEFT" });
    }
  }, [
    dispatch,
    isRotateLeft,
    currentTetromino,
    calcIfPossibleMove,
    previousIsRotateLeft,
  ]);

  // _____________ROTATE RIGHT
  useEffect(() => {
    if (!previousIsRotateRight && isRotateRight) {
      // Rotate right => no offsets, but new blocks ! (after rotation)
      // Note : 5 === +1 + 4 : always positive values for mod operator
      const newRotation = (currentTetromino.rotation + 5) % 4;
      const rotatedBlocks = _shapeToBlocks[currentTetromino.shape][newRotation];
      const isPossibleMove = calcIfPossibleMove(0, 0, rotatedBlocks);
      if (isPossibleMove) dispatch({ type: "CURRENT_TETROMINO/ROTATE_RIGHT" });
    }
  }, [
    dispatch,
    isRotateRight,
    currentTetromino,
    calcIfPossibleMove,
    previousIsRotateRight,
  ]);

  return null;
};

export default CurrentTetromino;
