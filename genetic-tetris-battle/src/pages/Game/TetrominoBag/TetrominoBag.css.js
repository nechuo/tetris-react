const styles = {
  nextLabelWrapper: ({ gridConfig }) => ({
    width: 40,
    color: "#888",
    display: "flex",
    marginLeft: 20,
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    background: "unset !important",
    height: 10 * gridConfig.blockSize + 3, // All queue blocks to display + borders
    marginTop:
      (gridConfig.nbVerticalBlocks + 0.5) * gridConfig.blockSize +
      69 -
      (10 * gridConfig.blockSize + 3),
  }),
  tetrominoBag: ({ gridConfig }) => ({
    color: "white",
    display: "flex",
    marginLeft: 10,
    alignItems: "center",
    position: "relative",
    border: "3px solid #333",
    justifyContent: "center",
    background: "unset !important",
    width: 3 * gridConfig.blockSize - 3,
    height: 10 * gridConfig.blockSize + 3, // All queue blocks to display + borders
    marginTop:
      gridConfig.nbVerticalBlocks * gridConfig.blockSize +
      69 -
      (10 * gridConfig.blockSize + 3),
  }),
  tetrominoBlock: ({ theme, gridConfig }) => ({
    ...theme.blockShadow,
    position: "absolute",
    width: gridConfig.blockSize / 2,
    height: gridConfig.blockSize / 2,
  }),
};

export default styles;
