import React, { useContext } from "react";

// Constants
import _shapeToColor from "../../../constants/shapeToColor";
import _shapeToCoordinates from "../../../constants/shapeToCoordinates";

// Context
import { GameContext } from "../Game";

// Styles
import styles from "./Grid.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const Grid = () => {
  // Hooks
  const theme = useTheme();
  const classes = useStyles({ theme });
  const {
    game: { grid, stackedBlocks, currentTetromino },
  } = useContext(GameContext); // Context data

  // Methods

  /**
   * Each 'slot' of the grid is drawn here.
   * If it overlaps one of the current tetromino block,
   * then return the current tetromino color.
   * If it overlaps a previously stack block,
   * then return the stacked block color.
   * Return black as the empty grid color.
   *
   * All the colors can ben changed in the constants
   */
  const calculateGridBlockColor = (gridBlockX, gridBlockY) => {
    // Find the current tetromino coordinates array from the templates
    const currentTetrominoCoordinates =
      _shapeToCoordinates[currentTetromino.shape][currentTetromino.rotation]; // 4 blocks !

    // Check if the current grid slot is part of the current tetromino
    const matchTetrominoBlock = currentTetrominoCoordinates.find(
      (block) =>
        block.x + currentTetromino.xOffset === gridBlockX &&
        block.y + currentTetromino.yOffset === gridBlockY
    );

    // Check if the current grid slot is a previously stacked block
    const matchStackedBlock = stackedBlocks.find(
      (block) => block.x === gridBlockX && block.y === gridBlockY
    );

    return matchTetrominoBlock != null
      ? _shapeToColor[currentTetromino.shape] // Tetromino color
      : matchStackedBlock != null
      ? matchStackedBlock.color // Stack block color
      : "black"; // Grid empty slock black color
  };

  // Render

  /**
   * Render the grid's 'nbVerticalBlocks * nbHorizontalBlocks' blocks
   * Each drawn block has a dynamic css background color.
   * If a block belong to the current tetromino, then use its color.
   * Same for stacked blocks
   */
  const renderGrid = () => {
    const rects = [];
    for (let y = 0; y < grid.nbVerticalBlocks; y++) {
      for (let x = 0; x < grid.nbHorizontalBlocks; x++) {
        rects.push(
          <div
            className={classes.gridRect}
            key={x * grid.nbHorizontalBlocks + y}
            style={{ backgroundColor: calculateGridBlockColor(x, y) }}
          />
        );
      }
    }
    return rects;
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.grid}
        style={{
          height: (grid.nbVerticalBlocks + 1) * 40,
          width: (grid.nbHorizontalBlocks + 0.5) * 40,
        }}
      >
        {renderGrid()}
      </div>
    </div>
  );
};

export default Grid;
