import React, { useState } from 'react';

function Movies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const API_KEY = "72346a34a0379ff205356803c6f5eb5d";

  const searchMovies = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addToList = (movie) => {
    const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];

    const exists = savedMovies.find(
      item => item.title === movie.title
    );

    if (!exists) {
      const updatedMovies = [
        ...savedMovies,
        {
          title: movie.title,
          completed: false
        }
      ];

      localStorage.setItem('movies', JSON.stringify(updatedMovies));

      setMessage(`${movie.title} added to your StreamList`);

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      setMessage(`${movie.title} is already in your StreamList`);

      setTimeout(() => {
        setMessage('');
      }, 3000);
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
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      {message && (
        <p className="success-message">
          {message}
        </p>
      )}

      <div className="movie-list">
        {results.length === 0 && <p>No results found</p>}

        {results.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div>
              <h4>{movie.title}</h4>
              <p>{movie.overview}</p>
            </div>

            <button onClick={() => addToList(movie)}>
              Add to List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;