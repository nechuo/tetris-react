import React, { useContext } from "react";

// Constants
import _shapeToBlocks from "../../../constants/shapeToBlocks";
import _shapeToColor from "../../../constants/shapeToColor";

// Context
import { GameContext } from "../Game";

// Styles
import styles from "./TetrominoBag.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const TetrominoBag = () => {
  // Context data
  // Note: the tetromino bag is stored inside the currentTetromino to simplify the currentTetromino reducer
  const {
    game: {
      currentTetromino: { tetrominosBag },
      gridConfig,
    },
  } = useContext(GameContext);

  // Styles
  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });

  return (
    <>
      {gridConfig.blockSize >= 15 && ( // Do not display the next tetrominos queue if the block size config is too small
        <>
          {" "}
          <div className={classes.nextLabelWrapper}>
            <span>next: </span>
          </div>
          <div className={classes.tetrominoBag}>
            {tetrominosBag.slice(0, 6).map((shape, index) => {
              // slice != splice, no side effect !!
              const blocks = _shapeToBlocks[shape][0];
              const color = _shapeToColor[shape];

              return blocks.map((block, index2) => (
                <div
                  key={index * 4 + index2} // Each tetromino has 4 blocks
                  className={classes.tetrominoBlock}
                  style={{
                    backgroundColor: color,
                    // Tried a lot of things below, this worked so..
                    left:
                      gridConfig.blockSize / 2 +
                      (block.x * gridConfig.blockSize) / 2,
                    top:
                      index * (gridConfig.blockSize * 1.5) +
                      (block.y + 1) * (gridConfig.blockSize / 2),
                  }}
                />
              ));
            })}
          </div>
        </>
      )}
    </>
  );
};

export default TetrominoBag;
