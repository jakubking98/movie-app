import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/App.css"; // Importuj style
import { FavoritesProvider } from "./context/FavoritesContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // Tworzenie  aplikacji

root.render(
  <FavoritesProvider>
    <App /> {/* Otaczamy aplikację kontekstem */}
  </FavoritesProvider>
);

reportWebVitals();
