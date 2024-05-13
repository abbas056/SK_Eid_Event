import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EventProvider } from "./services/Api";
import "./global.scss";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <EventProvider>
    <App />
  </EventProvider>
);

reportWebVitals();
