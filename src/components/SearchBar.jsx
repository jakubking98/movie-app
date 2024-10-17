import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // Stan przechowujący zapytanie użytkownika

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Wywołanie funkcji onSearch z zapytaniem
    setQuery(""); // Wyczyść pole wyszukiwania po przesłaniu
  };

  return (
    <form onSubmit={handleSearch} className="searchBox">
      <input
        className="search"
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Aktualizuje stan zapytania w trakcie wpisywania
      />
      <button className="searchButton" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
