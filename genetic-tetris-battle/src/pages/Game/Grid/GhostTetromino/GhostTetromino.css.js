const styles = {
  tetromino: ({ theme, gridConfig }) => ({
    ...theme.blockShadow,
    opacity: 0.2,
    position: "absolute",
    width: gridConfig.blockSize,
    height: gridConfig.blockSize,
  }),
};

export default styles;
