import React from "react";
import ReactDOM from "react-dom";
import Game from "./pages/Game/Game";
import "antd/dist/antd.min.css";
import styles from "./index.css";
import theme from "./assets/css/theme";
import { ThemeProvider, createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

const App = () => {
  useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
