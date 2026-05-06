import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

function StreamList() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('movies');
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (movieName.trim() === '') {
      return;
    }

    if (editIndex !== null) {
      const updatedMovies = [...movies];
      updatedMovies[editIndex].title = movieName;
      setMovies(updatedMovies);
      setEditIndex(null);
    } else {
      const newMovie = {
        title: movieName,
        completed: false
      };

      setMovies([...movies, newMovie]);
    }

    setMovieName('');
  };

  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, movieIndex) => movieIndex !== index);
    setMovies(updatedMovies);
  };

  const handleComplete = (index) => {
    const updatedMovies = [...movies];
    updatedMovies[index].completed = !updatedMovies[index].completed;
    setMovies(updatedMovies);
  };

  const handleEdit = (index) => {
    setMovieName(movies[index].title);
    setEditIndex(index);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'completed') return movie.completed;
    if (filter === 'active') return !movie.completed;
    return true;
  });

  return (
    <div className="page">
      <h2>My StreamList</h2>

      <p>Add movies or shows to your personal streaming list.</p>

      <form onSubmit={handleSubmit} className="stream-form">
        <input
          type="text"
          placeholder="Enter a movie or show"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />

        <button type="submit">
          {editIndex !== null ? 'Update Item' : 'Add to List'}
        </button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <p>
        Total: {movies.length} | Completed: {movies.filter(m => m.completed).length}
      </p>

      {movies.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <ul className="movie-list">
          {filteredMovies.map((movie, index) => (
            <li
              key={index}
              className={movie.completed ? 'completed movie-item' : 'movie-item'}
            >
              <span>
                {movie.completed ? '✅' : '🎬'} {movie.title}
              </span>

              <div className="movie-buttons">
                <button onClick={() => handleComplete(index)}>
                  <FaCheck />
                </button>

                <button onClick={() => handleEdit(index)}>
                  <FaEdit />
                </button>

                <button onClick={() => handleDelete(index)}>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StreamList;