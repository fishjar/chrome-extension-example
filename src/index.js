import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "./theme";
import App from "./views/Popup/App";
import "./global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
