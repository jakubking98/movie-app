import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "c77a0680fea9a0f9c9dd2a04c043b146"; // Użyj  klucza API
const BASE_URL = "https://api.themoviedb.org/3"; // Gdzie łaczymy sie przez API

export const useMovies = (query = "") => {
  const [movies, setMovies] = useState([]); // Przechowuje filmy
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState(null); // Przechowuje ewentualny błąd

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // Rozpocznij ładowanie
      setError(null); // Zresetuj błąd
      try {
        const url = query
          ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
              query
            )}` // Jeśli podano query, wyszukaj filmy
          : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`; // Jeśli nie, pobierz popularne filmy

        const response = await axios.get(url);
        setMovies(response.data.results); // Ustaw filmy w stanie
      } catch (err) {
        setError(err); // Ustaw błąd w stanie
      } finally {
        setLoading(false); // Zakończ ładowanie
      }
    };

    fetchMovies(); // Wywołaj funkcję pobierającą filmy
  }, [query]); // Uruchom ponownie, gdy zmieni się `query`

  return { movies, loading, error }; // Zwróć stan
};
