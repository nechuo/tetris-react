const styles = {
  container: ({ theme }) => theme.container,
  grid: ({ theme }) => ({
    ...theme.container,
    marginTop: 60,
    border: "2px solid #888888",
  }),
  gridRect: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderTop: "1px solid #666666",
    borderLeft: "1px solid #666666",
    WebkitBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    MozBoxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
    boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.8)",
  },
};

export default styles;
