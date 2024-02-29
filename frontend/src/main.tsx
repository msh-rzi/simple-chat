import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./configs/themeProvider.tsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <div className="home-gradient w-lvh-lvh h-lvh overflow-hidden flex items-center justify-center p-24">
        <Router>
          <App />
        </Router>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
