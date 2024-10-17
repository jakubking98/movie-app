import React from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";

import MovieList from "./components/MovieList"; // Import komponentu z listą filmów
import MovieDetail from "./components/MovieDetail"; // Import komponentu z iformacjami o wybranym filmie
import Favorites from "./components/Favorites"; // Import ulubionych filmów
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1 className="TilteBox">TMDB DataBase</h1>
        <nav className="box">
          <Link to="/" className="link">
            Home
          </Link>
          {/* Link do strony głównej */}
          <Link to="/favorites" className="link">
            Favorites
          </Link>
          {/* Link do ulubionych filmów */}
        </nav>
        <Routes>
          {/* Główna strona z listą filmów */}
          <Route path="/" element={<MovieList />} />
          {/* Strona z szczegółami o filmie */}
          <Route path="/movie/:id" element={<MovieDetail />} />
          {/* Strona z ulubionymi filmami */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
