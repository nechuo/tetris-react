import React from "react";
import ReactDOM from "react-dom";

// Components
import Game from "./pages/Game/Game";

//  Styles
import "antd/dist/antd.css";
import styles from "./index.css";
import theme from "./assets/css/theme";
import { ThemeProvider, createUseStyles } from "react-jss";
const useStyles = createUseStyles(styles);

const App = () => {
  // Styles
  useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
};

// Render the application in the specified div id
ReactDOM.render(<App />, document.getElementById("root"));
