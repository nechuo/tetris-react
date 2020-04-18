const styles = {
  container: ({ theme }) => ({
    ...theme.container,
    top: 0,
    left: 0,
    position: "absolute",
  }),
  stackedBlock: {
    width: 39,
    height: 39,
    position: "absolute",
    boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    MozBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    WebkitBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
  },
  grid: ({ theme, grid }) => ({
    ...theme.container,
    marginTop: 60,
    position: "relative",
    height: grid.nbVerticalBlocks * 40,
    width: grid.nbHorizontalBlocks * 40,
  }),
};

export default styles;
