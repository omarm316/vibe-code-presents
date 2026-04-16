import React from "react";
import ReactDOM from "react-dom/client";

import { PresentationShell } from "./presentation/PresentationShell";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PresentationShell />
  </React.StrictMode>
);
