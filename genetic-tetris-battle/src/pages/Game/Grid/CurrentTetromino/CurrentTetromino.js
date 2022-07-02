import React, { useContext, useEffect, useCallback, useMemo } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import _shapeToColor from "../../../../constants/shapeToColor";
import usePreviousState from "../../../../customHooks/usePreviousState";
import useControllerKeys from "../../../../customHooks/useControllerKeys";
import calculateIsPossibleMove from "../../../../helpers/calculateIsPossibleMove";
import { GameContext } from "../../Game";
import _shapeToBlocks from "../../../../constants/shapeToBlocks";
import styles from "./CurrentTetromino.css";
import { createUseStyles, useTheme } from "react-jss";
import calculateAllAvailableTargets from "../../../../helpers/calculateAllAvailableTargets";
const useStyles = createUseStyles(styles);

/**
 * Moves the falling tetromino.
 * Stacks the tetromino when it's blocked.
 */
const CurrentTetromino = () => {
  const {
    game: { currentTetromino, stack, gridConfig },
    dispatch,
  } = useContext(GameContext);

  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  const { isUp, isLeft, isDown, isRight, isRotateLeft, isRotateRight } =
    useControllerKeys({});

  // Prevent re-renders when the pressed key does not change.
  const previousIsUp = usePreviousState(isUp);
  const previousIsLeft = usePreviousState(isLeft);
  const previousIsDown = usePreviousState(isDown);
  const previousIsRight = usePreviousState(isRight);
  const previousIsRotateLeft = usePreviousState(isRotateLeft);
  const previousIsRotateRight = usePreviousState(isRotateRight);

  // Makes the tetromino fall.
  // TODO refactor this useEffect with AI best choice
  useEffect(() => {
    if (
      !isUp &&
      !isDown &&
      !isLeft &&
      !isRight &&
      !isRotateLeft &&
      !isRotateRight
    ) {
      // Prevent the thetromino from falling when the player presses a key.
      const allAvailableTargets = calculateAllAvailableTargets({
        ...gridConfig,
        currentTetromino,
        stackedBlocks: stack.blocks,
        maxStackHeight: stack.maxHeight,
        allTetrominoCoordinates: _shapeToBlocks[currentTetromino.shape],
      });

      const timeout = setTimeout(() => {
        if (allAvailableTargets.length === 0) {
          html2canvas(document.querySelector("#root"))
            .then((canvas) => {
              // Download a screenshot when the game is over.
              var element = document.createElement("a");
              element.setAttribute("href", canvas.toDataURL("image/jpeg"));
              element.setAttribute("download", "Screenshot" + moment.now());
              element.style.display = "none";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
              return Promise.resolve(true);
            })
            .then(() =>
              dispatch({
                type: "STACKED_BLOCKS/RESET_GAME",
                nbHorizontalBlocks: gridConfig.nbHorizontalBlocks,
              })
            );
          return () => clearTimeout(timeout);
        } else {
          dispatch({
            type: "STACKED_BLOCKS/STACK_TETROMINO",
            currentTetromino:
              allAvailableTargets[
                Math.floor(Math.random() * allAvailableTargets.length)
              ],
            ...gridConfig,
          });
        }
      }, 2);

      return () => clearTimeout(timeout);
    }
  });

  /*
   * Checks if the tetromino can move to the given direction or rotation.
   */
  const checkNewMove = useCallback(
    (newXOffset, newYOffset, newTetrominoBlocks = currentTetromino.blocks) =>
      calculateIsPossibleMove({
        newXOffset,
        newYOffset,
        ...gridConfig,
        currentTetromino,
        newTetrominoBlocks,
        stackedBlocks: stack.blocks,
      }),

    [currentTetromino, stack, gridConfig]
  );

  // ____________MOVE UP; IMMEDIATE FALL DOWN
  useEffect(() => {
    // If the player presses the UP arrow, then stack the tetromino.
    if (!previousIsUp && isUp) {
      // Left => newXOffset: -1; newYOffset: 0
      let newYOffset = 0;
      // Virtually move down until a stacked block (or the bototm of the grid) is reached
      while (checkNewMove(0, newYOffset)) newYOffset++;

      dispatch({
        type: "STACKED_BLOCKS/STACK_TETROMINO",
        ...gridConfig,
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
        // Stack the tetromino if it can not move down anymore
        dispatch({
          type: "STACKED_BLOCKS/STACK_TETROMINO",
          ...gridConfig,
          currentTetromino,
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
      // Note : 5 === +1 + 4 : always positive values for mod operator // TODO why not +1 ???????
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

  // TODO use React memo here
  return useMemo(
    () => (
      <>
        {currentTetromino.blocks.map((block, index) => {
          // Top absolute offset in px
          const top =
            (currentTetromino.yOffset + block.y) * gridConfig.blockSize + 0.5; // 0.5 <=> half border width

          // Left absolute offset in px
          const left =
            (currentTetromino.xOffset + block.x) * gridConfig.blockSize + 0.5; // 0.5 <=> half border width

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
