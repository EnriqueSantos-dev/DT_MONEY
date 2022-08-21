import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InputsOthersProvider } from "./contexts/Inputs/inputs";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <InputsOthersProvider>
      <App />
    </InputsOthersProvider>
  </React.StrictMode>
);
