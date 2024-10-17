import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Importujemy Link do nawigacji
import { FavoritesContext } from "../context/FavoritesContext"; // Importujemy ulubione filmy

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoritesContext); // Uzyskanie dostępu do ulubionych

  const isFavorite = favorites.some((fav) => fav.id === movie.id); // Sprawdzenie, czy film jest w ulubionych

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Zapobiega przejściu do szczegółów filmu przy kliknięciu w przycisk
    if (isFavorite) {
      removeFavorite(movie.id); // Usuń z ulubionych, jeśli film już tam jest
    } else {
      addFavorite(movie); // Dodaj do ulubionych, jeśli film tam nie jest
    }
  };

  // Ustalanie URL zdjęcia lub null, jeśli brak zdjęcia
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null; // Ustawiamy na null, jeśli nie ma zdjęcia

  // Jeśli nie ma zdjęcia, nie renderuj komponentu
  if (!imageUrl) {
    return null; // Zwracamy null, jeśli nie ma zdjęcia
  }

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="decoration">
        {/* Link do szczegółów filmu */}
        <img src={imageUrl} alt={movie.title} /> {/* Dodaj obraz filmu */}
        <h3>{movie.title}</h3> {/* Wyświetl tytuł filmu */}
        <p>
          Rating: <b>{movie.vote_average}</b> {/* Wyświetl ocenę filmu */}
        </p>
      </Link>
      <button onClick={handleFavoriteClick} className="buttonAdd">
        {/* Przycisk dodania/usunięcia z ulubionych */}
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}{" "}
        {/* Tekst przycisku zależny od statusu ulubionych */}
      </button>
    </div>
  );
};

export default MovieCard;
