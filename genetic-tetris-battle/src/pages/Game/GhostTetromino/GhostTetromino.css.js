const styles = {
  container: ({ theme }) => ({
    ...theme.container,
    top: 0,
    left: 0,
    position: "absolute",
  }),
  tetromino: ({ gridConfig }) => ({
    width: gridConfig.blockSize,
    height: gridConfig.blockSize,
    opacity: 0.2,
    position: "absolute",
    boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    MozBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    WebkitBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
  }),
  grid: ({ theme, gridConfig }) => ({
    ...theme.container,
    marginTop: 60,
    position: "relative",
    height: gridConfig.nbVerticalBlocks * gridConfig.blockSize,
    width: gridConfig.nbHorizontalBlocks * gridConfig.blockSize,
  }),
};

export default styles;
