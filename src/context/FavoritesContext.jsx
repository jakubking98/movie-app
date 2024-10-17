import React, { createContext, useState } from "react";

// Tworzy kontekst dla ulubionych filmów
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // Stan przechowujący ulubione filmy

  // Funkcja dodająca film do ulubionych
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  // Funkcja usuwająca film z ulubionych po ID
  const removeFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== id)
    );
  };

  return (
    // Udostępnienie wartości i funkcji kontekstu ulubionych filmów
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children} {/* Renderowanie dzieci zawartych w tym providerze */}
    </FavoritesContext.Provider>
  );
};
