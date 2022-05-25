import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { App } from "./components/App";
import "./index.scss";

Modal.setAppElement("#root");


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
