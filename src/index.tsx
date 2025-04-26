import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Amplify, { Hub, DataStore } from "aws-amplify";
import awsExports from "./aws-exports";
import { Provider } from "react-redux";
import { store } from "./reduxStore";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
  responsiveFontSizes,
  Theme,
} from "@material-ui/core";
import { blueGrey, teal } from "@material-ui/core/colors";
import App from "./App";
import { syncUserWithRedux } from "./auth/utils";

Amplify.configure(awsExports);
Hub.listen("auth", syncUserWithRedux);
Hub.listen("auth", async (data) => {
  if (data.payload.event === "signOut") {
    console.info("Clearing local data store ...");
    await DataStore.clear();
    console.info("Local data store cleared.");
  }
});

let theme: Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2C3E50", // Professional dark blue
      light: "#34495E",
      dark: "#1A252F",
    },
    secondary: {
      main: "#34495E", // Complementary dark blue
      light: "#2C3E50",
      dark: "#1A252F",
    },
    background: {
      default: "#1A252F", // Dark background
      paper: "#2C3E50",
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: "bold",
        color: "#ECF0F1", // Light text
      },
      h2: {
        fontWeight: "normal",
        color: "#ECF0F1",
      },
      h3: {
        fontWeight: "lighter",
        color: "#ECF0F1",
      },
    },
  },
});
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
