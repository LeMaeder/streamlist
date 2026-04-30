import React, { useState } from 'react';

function Movies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const API_KEY = "72346a34a0379ff205356803c6f5eb5d";

  const searchMovies = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );

      const data = await response.json();
      setResults(data.results || []);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchMovies();
    }
  };

  return (
    <div className="page">
      <h2>Search Movies</h2>

      <div className="stream-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movie-list">
        {searched && results.length === 0 && (
          <p>No results found.</p>
        )}

        {results.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div>
              <h4>{movie.title}</h4>
              <p>{movie.overview || "No description available."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;