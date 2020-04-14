import React from "react";
import ReactDOM from "react-dom";

// Components
import Game from "./pages/Game/Game";

//  Styles
import styles from "./index.css";
import theme from "./assets/css/theme";
import { ThemeProvider, createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

const App = () => {
  // Hooks
  useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
