const styles = {
  container: ({ theme }) => theme.container,
  grid: ({ theme, grid }) => ({
    ...theme.container,
    marginTop: 60,
    border: "3px solid #222222",
    backgroundSize: "40px 40px",
    height: grid.nbVerticalBlocks * 40 + 9,
    width: grid.nbHorizontalBlocks * 40 + 9,
    backgroundImage:
      "repeating-linear-gradient(#111111 0 3px, transparent 0px 100%), repeating-linear-gradient(90deg, #111111 0 3px, transparent 0px 100%)",
  }),
};

export default styles;
