const styles = {
  grid: ({ theme, gridConfig }) => ({
    ...theme.container,
    marginTop: 60,
    position: "relative",
    border: "4px solid #333",
    height: gridConfig.nbVerticalBlocks * gridConfig.blockSize + 9,
    width: gridConfig.nbHorizontalBlocks * gridConfig.blockSize + 9,
    backgroundSize: `${gridConfig.blockSize}px ${gridConfig.blockSize}px`,
    backgroundImage:
      "repeating-linear-gradient(#222 0 1px, transparent 0px 100%), repeating-linear-gradient(90deg, #222 0 1px, transparent 0px 100%)",
  }),
};

export default styles;
