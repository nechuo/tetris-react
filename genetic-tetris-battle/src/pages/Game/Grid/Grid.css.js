const styles = {
  container: ({ theme }) => theme.container,
  grid: ({ theme }) => ({
    ...theme.container,
    marginTop: 60,
    border: "3px solid #888888",
  }),
  gridRect: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    border: "1px solid #888888",
  },
};

export default styles;
