const styles = {
  tetromino: ({ gridConfig }) => ({
    opacity: 0.2,
    position: "absolute",
    width: gridConfig.blockSize,
    height: gridConfig.blockSize,
    boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    MozBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    WebkitBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
  }),
  ghostTetromino: ({ theme, gridConfig }) => ({
    ...theme.container,
    marginTop: 60,
    position: "absolute",
    background: "unset !important",
    height: gridConfig.nbVerticalBlocks * gridConfig.blockSize,
    width: gridConfig.nbHorizontalBlocks * gridConfig.blockSize,
  }),
};

export default styles;
