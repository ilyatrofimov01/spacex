import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { App } from "./components/App";
import { globalCss } from "@stitches/react";

Modal.setAppElement("#root");

const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0
  }
});

globalStyles();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
