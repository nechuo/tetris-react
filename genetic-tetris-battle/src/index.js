import React from "react";
import ReactDOM from "react-dom";

//  Styles
import "./index.css";
import theme from "./assets/css/theme";
import { ThemeProvider } from "react-jss";

// Components
import Game from "./pages/Game/Game";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Game />
  </ThemeProvider>,
  document.getElementById("root")
);
