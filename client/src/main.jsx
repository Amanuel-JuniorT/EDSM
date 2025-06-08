import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Test from "./pages/Test.jsx";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";

/*
  main.jsx - React app entry point for EDSM
  ----------------------------------------
  - Mounts the App component to the DOM.
  - Add any global providers (e.g., context, StrictMode) here if needed.
  - For backend/frontend devs: If you add analytics, error boundaries, or wrappers, do it here.
*/
// main.jsx - App entry point, wraps App with providers and renders to DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ThemeProvider for light/dark mode, BrowserRouter for routing */}
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
