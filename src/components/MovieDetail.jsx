import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "c77a0680fea9a0f9c9dd2a04c043b146"; // Użyj swojego klucza API
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
  const { id } = useParams(); // Pobierz ID filmu z parametrów URL
  const [movie, setMovie] = useState(null); // Stan przechowujący szczegóły filmu
  const [cast, setCast] = useState([]); // Stan przechowujący obsadę
  const [trailer, setTrailer] = useState(null); // Stan przechowujący zwiastun
  const [loading, setLoading] = useState(true); // Stan ładowania danych
  const [error, setError] = useState(null); // Stan przechowujący błędy

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        setMovie(response.data); // Ustawienie szczegółów filmu

        // Pobierz szczegóły obsady
        const castResponse = await axios.get(
          `${BASE_URL}/movie/${id}/credits`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );
        setCast(castResponse.data.cast); // Ustawienie obsady

        // Pobierz zwiastun
        const videoResponse = await axios.get(
          `${BASE_URL}/movie/${id}/videos`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );
        const trailers = videoResponse.data.results;
        // Znajdź pierwszy zwiastun
        const foundTrailer = trailers.find((video) => video.type === "Trailer");
        setTrailer(foundTrailer); // Ustawienie zwiastuna
      } catch (err) {
        setError(err); // Ustawienie błędu w razie problemów
      } finally {
        setLoading(false); // Zakończenie ładowania
      }
    };

    fetchMovieDetails(); // Wywołanie funkcji do pobrania danych filmu
  }, [id]); // Uruchomienie, gdy zmieni się ID filmu

  if (loading) return <p>Loading...</p>; // Wyświetlenie komunikatu ładowania
  if (error) return <p>Error fetching movie details.</p>; // Wyświetlenie komunikatu błędu

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // URL plakatu filmu
    : "https://via.placeholder.com/500x750?text=No+Image"; // Placeholder, jeśli brak plakatu

  return (
    <div className="movie-detail">
      <h2 className="movieTitle">{movie.title}</h2>
      <img src={imageUrl} alt={movie.title} /> {/* Wyświetlenie plakatu */}
      <p className="text">{movie.overview}</p> {/* Opis filmu */}
      <p className="text">Rating: {movie.vote_average}</p> {/* Ocena filmu */}
      <p className="text">Release Date: {movie.release_date}</p>
      {/* Data premiery */}
      {trailer && (
        <div className="trailer">
          <h3 className="titleTrailer">Trailer</h3>
          <iframe
            title="Movie Trailer"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`} // Wyświetlenie zwiastuna
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <h3 className="text">
        <b>Cast</b>
      </h3>
      <div className="cast-list">
        {/* Komunikat, gdy brak obsady */}
        {cast.length === 0 ? (
          <p>No cast information available.</p>
        ) : (
          cast
            .filter((actor) => actor.profile_path) // Filtruj aktorów bez zdjęć
            .map((actor) => (
              <div key={actor.id} className="actor-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} // Zdjęcie aktora
                  alt={actor.name}
                  className="actor-image"
                />
                <p>{actor.name}</p> {/* Imie i nazwisko aktora */}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
