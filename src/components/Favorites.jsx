import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext"; // Importuj  ulubione filmy
import MovieCard from "./MovieCard"; // Importuj komponent karty filmu

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext); // Użyj  do pobrania ulubionych filmów

  return (
    <div className="favorites-section">
      <h2 className="favoriteText">Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies found.</p> // Komunikat, gdy brak ulubionych filmów
      ) : (
        <div className="movie-cards">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> // Wyświetl ulubione filmy
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
