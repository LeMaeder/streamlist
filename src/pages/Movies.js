import React, { useState } from 'react';

function Movies() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const API_KEY = "72346a34a0379ff205356803c6f5eb5d";

  // SEARCH MOVIES / ACTORS / YEARS

  const searchMovies = async () => {

    if (!query.trim()) return;

    try {

      let movieResults = [];

      // YEAR SEARCH

      if (/^\d{4}$/.test(query)) {

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_year=${query}`
        );

        const data = await response.json();

        movieResults = data.results || [];

      } else {

        // MOVIE TITLE SEARCH

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        const movieData = await movieResponse.json();

        movieResults = movieData.results || [];

        // ACTOR SEARCH IF FEW MOVIE RESULTS

        if (movieResults.length < 3) {

          const actorResponse = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
          );

          const actorData = await actorResponse.json();

          if (actorData.results && actorData.results.length > 0) {

            const actorId = actorData.results[0].id;

            const creditsResponse = await fetch(
              `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`
            );

            const creditsData = await creditsResponse.json();

            if (creditsData.cast) {

              movieResults = creditsData.cast;

            }
          }
        }
      }

      const detailedMovies = await enrichMovieData(movieResults);

      setResults(detailedMovies);

    } catch (error) {

      console.error("Error fetching movies:", error);

    }
  };

  // ENRICH MOVIE DATA

  const enrichMovieData = async (movies) => {

    const detailedMovies = await Promise.all(

      movies.slice(0, 20).map(async (movie) => {

        try {

          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
          );

          const details = await detailsResponse.json();

          const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
          );

          const credits = await creditsResponse.json();

          const releaseResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
          );

          const releaseData = await releaseResponse.json();

          let movieRating = "NR";

          const usRelease = releaseData.results?.find(
            item => item.iso_3166_1 === "US"
          );

          if (usRelease?.release_dates?.length > 0) {

            const rated = usRelease.release_dates.find(
              item => item.certification !== ""
            );

            if (rated) {
              movieRating = rated.certification;
            }
          }

          return {

            ...movie,

            genres:
              details.genres?.map(g => g.name) || [],

            cast:
              credits.cast
                ?.slice(0, 3)
                .map(actor => actor.name)
                .join(", ") || "N/A",

            movieRating

          };

        } catch {

          return movie;

        }

      })

    );

    return detailedMovies;
  };

  // TRENDING MOVIES

  const fetchTrendingMovies = async () => {

    try {

      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );

      const data = await response.json();

      const detailedMovies =
        await enrichMovieData(data.results || []);

      setResults(detailedMovies);

    } catch (error) {

      console.error("Error fetching trending movies:", error);

    }
  };

  // TOP RATED MOVIES

  const fetchTopRatedMovies = async () => {

    try {

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );

      const data = await response.json();

      const detailedMovies =
        await enrichMovieData(data.results || []);

      setResults(detailedMovies);

    } catch (error) {

      console.error("Error fetching top rated movies:", error);

    }
  };

  // ADD TO WATCHLIST

  const addToList = (movie) => {

    const savedMovies =
      JSON.parse(localStorage.getItem('movies')) || [];

    const exists = savedMovies.find(
      item => item.title === movie.title
    );

    if (!exists) {

      const updatedMovies = [

        ...savedMovies,

        {
          title: movie.title,

          year: movie.release_date
            ? movie.release_date.substring(0, 4)
            : "N/A",

          rating: movie.vote_average,

          movieRating: movie.movieRating || "NR",

          genres: movie.genres || [],

          cast: movie.cast || "N/A",

          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",

          overview: movie.overview,

          completed: false,
          favorite: false
        }
      ];

      localStorage.setItem(
        'movies',
        JSON.stringify(updatedMovies)
      );

      setMessage(`${movie.title} added to your Watchlist`);

    } else {

      setMessage(`${movie.title} is already in your Watchlist`);

    }

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (

    <div className="page">

      <section className="hero-banner">

        <div className="film-strip">
          ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮
        </div>

        <h2>Discover Movies</h2>

        <p>
          Search movies, actors, genres, or years to discover entertainment.
        </p>

      </section>

      <div className="stream-form">

        <input
          type="text"
          placeholder="Search movies, actors, genres, or years..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={searchMovies}>
          Search
        </button>

      </div>

      <div className="quick-buttons">

        <button onClick={fetchTrendingMovies}>
          🔥 Trending Movies
        </button>

        <button onClick={fetchTopRatedMovies}>
          ⭐ Top Rated
        </button>

      </div>

      {message && (

        <div className="success-message">
          {message}
        </div>

      )}

      <div className="movie-list">

        {results.length === 0 ? (

          <p className="empty-state">
            Search for movies to begin exploring.
          </p>

        ) : (

          results.map((movie) => (

            <div
              key={movie.id}
              className="movie-item"
            >

              {movie.poster_path ? (

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

              ) : (

                <div className="no-poster">
                  No Poster Available
                </div>

              )}

              <div className="movie-item-content">

                <h4>{movie.title}</h4>

                <p>
                  <strong>Year:</strong>{" "}
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : "N/A"}
                </p>

                <p>
                  <strong>Viewer Rating:</strong> ⭐{" "}
                  {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </p>

                <p>
                  <strong>Movie Rating:</strong>{" "}
                  {movie.movieRating || "NR"}
                </p>

                <div className="genre-tags">

                  {movie.genres?.map((genre, index) => (

                    <span
                      key={index}
                      className="genre-tag"
                    >
                      {genre}
                    </span>

                  ))}

                </div>

                <p>
                  <strong>Top Cast:</strong>{" "}
                  {movie.cast || "N/A"}
                </p>

                <p className="movie-overview">

                  {movie.overview
                    ? movie.overview.substring(0, 140) + "..."
                    : "No overview available."}

                </p>

                <button onClick={() => addToList(movie)}>
                  Add to Watchlist
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Movies;

