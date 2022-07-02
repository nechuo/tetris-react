import React, { useContext } from "react";
import _shapeToBlocks from "../../../constants/shapeToBlocks";
import _shapeToColor from "../../../constants/shapeToColor";
import { GameContext } from "../Game";
import styles from "./TetrominoBag.css";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles(styles);

const TetrominoBag = () => {
  const {
    game: {
      currentTetromino: { tetrominosBag },
      gridConfig,
    },
  } = useContext(GameContext);

  const theme = useTheme();
  const classes = useStyles({ theme, gridConfig });
  return (
    <>
      {gridConfig.blockSize >= 15 && (
        // If the grid is too small, then do not display the next tetrominos.
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
                  // Each tetromino has 4 rotations.
                  key={index * 4 + index2}
                  className={classes.tetrominoBlock}
                  style={{
                    backgroundColor: color,
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
