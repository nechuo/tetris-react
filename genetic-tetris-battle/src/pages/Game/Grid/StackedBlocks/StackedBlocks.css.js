const styles = {
  stackedBlock: ({ theme, gridConfig }) => ({
    ...theme.blockShadow,
    position: "absolute",
    width: gridConfig.blockSize,
    height: gridConfig.blockSize,
  }),
};

export default styles;
