const styles = {
  container: ({ theme }) => ({
    ...theme.container,
    top: 0,
    left: 0,
    position: "absolute",
  }),
  tetromino: {
    width: 50,
    height: 50,
    position: "absolute",
    boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    MozBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    WebkitBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
  },
  grid: ({ theme, grid }) => ({
    ...theme.container,
    marginTop: 60,
    position: "relative",
    height: grid.nbVerticalBlocks * 50,
    width: grid.nbHorizontalBlocks * 50,
  }),
};

export default styles;
