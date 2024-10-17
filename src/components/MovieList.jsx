import React, { useState } from "react";
import { useMovies } from "../hooks/useMovies"; // Importuj hook do pobierania filmów
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar"; // Importuj komponent wyszukiwania

const MovieList = () => {
  const [query, setQuery] = useState(""); // Ustawienie stanu zapytania
  const {
    movies: popularMovies,
    loading: popularLoading,
    error: popularError,
  } = useMovies(); // Pobierz popularne filmy
  const {
    movies: searchedMovies,
    loading: searchLoading,
    error: searchError,
  } = useMovies(query); // Pobierz filmy na podstawie zapytania

  const handleSearch = (newQuery) => {
    setQuery(newQuery); // Ustawiamy nowe zapytanie
  };

  return (
    <div className="movie-list">
      {/* Sekcja wyszukiwania */}
      <div className="search-section">
        <h2 className="searchText">Search Movies</h2>
        <SearchBar onSearch={handleSearch} />{" "}
        {/* Przekazanie funkcji wyszukiwania */}
        {searchLoading && <p>Loading search results...</p>}{" "}
        {/* Komunikat ładowania dla wyników wyszukiwania */}
        {searchError && (
          <p>Error fetching search results: {searchError.message}</p>
        )}
        {/* Komunikat błędu dla wyszukiwania */}
        {searchedMovies.length === 0 && query && (
          <p>No movies found for "{query}".</p>
        )}
        {/* Komunikat, gdy brak wyników wyszukiwania */}
        <div className="movie-cards">
          {searchedMovies
            .filter((movie) => movie.poster_path) // Filtrujemy filmy, które mają dostępny plakat
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          {/* Wyświetlanie  wyników wyszukiwania */}
        </div>
      </div>

      {/* Sekcja popularnych filmów */}
      <div className="popular-section">
        <h2>Popular Movies</h2>
        {popularLoading && <p>Loading popular movies...</p>}
        {/* Komunikat ładowania dla popularnych filmów */}
        {popularError && (
          <p>Error fetching popular movies: {popularError.message}</p>
        )}
        {/* Komunikat błędu dla popularnych filmów */}
        {popularMovies.length === 0 && <p>No popular movies found.</p>}
        {/* Komunikat, gdy brak popularnych filmów */}
        <div className="movie-cards">
          {popularMovies
            .filter((movie) => movie.poster_path) // Filtrujemy filmy, które mają dostępny plakat
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          {/* Wyświetlanie kart popularnych filmów */}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
