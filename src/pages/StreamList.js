import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaShareAlt,
  FaFileExport,
  FaStar
} from 'react-icons/fa';

import React, { useState, useEffect } from 'react';

function StreamList() {

  const [searchQuery, setSearchQuery] = useState('');

  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('movies');
    return saved ? JSON.parse(saved) : [];
  });

  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [movieRatingFilter, setMovieRatingFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');

  const [sortType, setSortType] = useState('default');

  const [message, setMessage] = useState('');

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const showMessage = (text) => {

    setMessage(text);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const getGenresArray = (genres) => {

    if (!genres) return [];

    if (Array.isArray(genres)) {
      return genres;
    }

    return genres
      .split(',')
      .map(genre => genre.trim())
      .filter(Boolean);
  };

  const handleDelete = (index) => {

    const selectedMovie = visibleMovies[index];

    const updatedMovies = movies.filter(
      movie => movie !== selectedMovie
    );

    setMovies(updatedMovies);

    showMessage("Movie removed.");
  };

  const handleComplete = (index) => {

    const selectedMovie = visibleMovies[index];

    const updatedMovies = movies.map(movie =>
      movie === selectedMovie
        ? { ...movie, completed: !movie.completed }
        : movie
    );

    setMovies(updatedMovies);
  };

  const toggleFavorite = (index) => {

    const selectedMovie = visibleMovies[index];

    const updatedMovies = movies.map(movie =>
      movie === selectedMovie
        ? { ...movie, favorite: !movie.favorite }
        : movie
    );

    setMovies(updatedMovies);
  };

  const handleEdit = (index) => {

    const selectedMovie = visibleMovies[index];

    const originalIndex = movies.findIndex(
      movie => movie === selectedMovie
    );

    const newTitle = prompt(
      "Edit movie title:",
      selectedMovie.title
    );

    if (!newTitle) return;

    const updatedMovies = [...movies];

    updatedMovies[originalIndex].title = newTitle;

    setMovies(updatedMovies);

    showMessage("Movie updated.");
  };

  const allGenres = [
    ...new Set(
      movies.flatMap(movie =>
        getGenresArray(movie.genres)
      )
    )
  ].sort();

  const allYears = [
    ...new Set(
      movies
        .map(movie => movie.year)
        .filter(year =>
          year &&
          year !== "Unknown"
        )
    )
  ].sort((a, b) => b.localeCompare(a));

  let visibleMovies = movies.filter((movie) => {

    const numericRating =
      parseFloat(movie.rating || 0);

    const titleMatch =
      movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && movie.completed) ||
      (statusFilter === 'active' && !movie.completed) ||
      (statusFilter === 'favorites' && movie.favorite);

    const viewerRatingMatch =
      ratingFilter === 'all' ||
      (ratingFilter === '7' && numericRating >= 7) ||
      (ratingFilter === '8' && numericRating >= 8) ||
      (ratingFilter === '9' && numericRating >= 9);

    const movieRatingMatch =
      movieRatingFilter === 'all' ||
      movie.movieRating === movieRatingFilter;

    const yearMatch =
      yearFilter === 'all' ||
      movie.year === yearFilter;

    const genreMatch =
      genreFilter === 'all' ||
      getGenresArray(movie.genres).includes(genreFilter);

    return (
      titleMatch &&
      statusMatch &&
      viewerRatingMatch &&
      movieRatingMatch &&
      yearMatch &&
      genreMatch
    );
  });

  if (sortType === 'alphabetical') {

    visibleMovies.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

  }

  else if (sortType === 'year') {

    visibleMovies.sort((a, b) =>
      String(b.year).localeCompare(String(a.year))
    );

  }

  else if (sortType === 'genre') {

    visibleMovies.sort((a, b) =>

      (getGenresArray(a.genres)[0] || '')
        .localeCompare(
          getGenresArray(b.genres)[0] || ''
        )

    );

  }

  else if (sortType === 'rating') {

    visibleMovies.sort((a, b) =>
      parseFloat(b.rating || 0) -
      parseFloat(a.rating || 0)
    );
  }

  const exportWatchlist = () => {

    if (movies.length === 0) {

      showMessage("There are no movies to export.");

      return;
    }

    const rows = [
      [
        "Title",
        "Year",
        "Viewer Rating",
        "Movie Rating",
        "Genres",
        "Top Cast",
        "Favorite",
        "Completed"
      ],

      ...movies.map(movie => [
        movie.title,
        movie.year,
        movie.rating,
        movie.movieRating,
        Array.isArray(movie.genres)
          ? movie.genres.join(', ')
          : movie.genres,
        movie.cast,
        movie.favorite ? "Yes" : "No",
        movie.completed ? "Yes" : "No"
      ])
    ];

    const csvContent = rows.map(row =>
      row.map(value =>
        `"${String(value || '').replace(/"/g, '""')}"`
      ).join(',')
    ).join('\n');

    const blob = new Blob(
      [csvContent],
      { type: 'text/csv' }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = 'EZTechMovie-Watchlist.csv';

    link.click();

    URL.revokeObjectURL(url);

    showMessage("Watchlist exported successfully.");
  };

  const shareWatchlist = async () => {

    if (movies.length === 0) {

      showMessage("There are no movies to share.");

      return;
    }

    const listText = movies.map(movie =>
      `${movie.favorite ? "⭐ " : ""}${movie.title} (${movie.year})`
    ).join('\n');

    const shareText =
      `My EZTechMovie Watchlist:\n\n${listText}`;

    try {

      await navigator.clipboard.writeText(shareText);

      showMessage("Watchlist copied to clipboard.");

    }

    catch {

      showMessage("Unable to copy watchlist.");
    }
  };

  return (

    <div className="page">

      <div className="watchlist-header">

        <h2>My Watchlist</h2>

        <p>
          Manage your saved movies, favorites, and filters.
        </p>

      </div>

      <div className="stream-form">

        <input
          type="text"
          placeholder="Search your watchlist..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
        />

      </div>

      {message && (

        <p className="success-message">
          {message}
        </p>

      )}

      <div className="watchlist-toolbar">

        <div className="filter-dropdown-wrapper">

          <button
            className="filter-toggle-button"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            {showFilters
              ? '▲ Sort & Filter'
              : '▼ Sort & Filter'}
          </button>

        </div>

        <section className="watchlist-actions">

          <button onClick={shareWatchlist}>
            <FaShareAlt />
            Share Watchlist
          </button>

          <button onClick={exportWatchlist}>
            <FaFileExport />
            Export CSV
          </button>

        </section>

      </div>

      {showFilters && (

        <section className="control-panel">

          <div className="control-group">

            <label>Sort By</label>

            <select
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value)
              }
            >
              <option value="default">Default</option>
              <option value="alphabetical">A-Z</option>
              <option value="year">Year Made</option>
              <option value="genre">Genre</option>
              <option value="rating">Viewer Rating</option>
            </select>

          </div>

          <div className="control-group">

            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="favorites">Favorites</option>
            </select>

          </div>

          <div className="control-group">

            <label>Viewer Rating</label>

            <select
              value={ratingFilter}
              onChange={(e) =>
                setRatingFilter(e.target.value)
              }
            >
              <option value="all">All Ratings</option>
              <option value="7">7+</option>
              <option value="8">8+</option>
              <option value="9">9+</option>
            </select>

          </div>

          <div className="control-group">

            <label>Movie Rating</label>

            <select
              value={movieRatingFilter}
              onChange={(e) =>
                setMovieRatingFilter(e.target.value)
              }
            >
              <option value="all">All</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NR">NR</option>
            </select>

          </div>

          <div className="control-group">

            <label>Year Made</label>

            <select
              value={yearFilter}
              onChange={(e) =>
                setYearFilter(e.target.value)
              }
            >
              <option value="all">All Years</option>

              {allYears.map(year => (

                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>

              ))}

            </select>

          </div>

          <div className="control-group">

            <label>Genre</label>

            <select
              value={genreFilter}
              onChange={(e) =>
                setGenreFilter(e.target.value)
              }
            >
              <option value="all">All Genres</option>

              {allGenres.map(genre => (

                <option
                  key={genre}
                  value={genre}
                >
                  {genre}
                </option>

              ))}

            </select>

          </div>

        </section>

      )}

      {movies.length === 0 ? (

        <p className="empty-state">
          No movies added yet.
        </p>

      ) : visibleMovies.length === 0 ? (

        <p className="empty-state">
          No movies match the selected filters.
        </p>

      ) : (

        <div className="movie-grid">

          {visibleMovies.map((movie, index) => (

            <div
              key={index}
              className={
                movie.completed
                  ? 'completed movie-card'
                  : 'movie-card'
              }
            >

              {movie.poster ? (

                <img
                  className="movie-poster"
                  src={movie.poster}
                  alt={movie.title}
                />

              ) : (

                <div className="no-poster">
                  No Image
                </div>

              )}

              <div className="movie-details">

                <h3>
                  {movie.favorite && '⭐ '}
                  {movie.completed ? '✅ ' : '🎬 '}
                  {movie.title}
                </h3>

                <p>
                  <strong>Year:</strong> {movie.year}
                </p>

                <p>
                  <strong>Viewer Rating:</strong> ⭐ {parseFloat(movie.rating || 0).toFixed(1)}
                </p>

                <p>
                  <strong>Movie Rating:</strong> {movie.movieRating || "NR"}
                </p>

                <div className="genre-tags">

                  {getGenresArray(movie.genres).map(genre => (

                    <span
                      key={genre}
                      className="genre-tag"
                    >
                      {genre}
                    </span>

                  ))}

                </div>

                <p>
                  <strong>Top Cast:</strong> {movie.cast || "Unknown"}
                </p>

                <p className="movie-overview">

                  {movie.overview
                    ? movie.overview.substring(0, 220) + "..."
                    : "No overview available."}

                </p>

                <div className="movie-buttons">

                  <button
                    onClick={() =>
                      toggleFavorite(index)
                    }
                  >
                    <FaStar />
                  </button>

                  <button
                    onClick={() =>
                      handleComplete(index)
                    }
                  >
                    <FaCheck />
                  </button>

                  <button
                    onClick={() =>
                      handleEdit(index)
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(index)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default StreamList;

