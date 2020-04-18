const styles = {
  container: ({ theme }) => theme.container,
  grid: ({ theme, gridConfig }) => ({
    ...theme.container,
    marginTop: 60,
    border: "3px solid #333",
    backgroundSize: "50px 50px",
    height: gridConfig.nbVerticalBlocks * 50 + 9,
    width: gridConfig.nbHorizontalBlocks * 50 + 9,
    backgroundImage:
      "repeating-linear-gradient(#222 0 3px, transparent 0px 100%), repeating-linear-gradient(90deg, #222 0 3px, transparent 0px 100%)",
  }),
};

export default styles;
