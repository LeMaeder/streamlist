import React, { useState } from 'react';

function StreamList() {
  const [movieName, setMovieName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User entered:', movieName);
    setMovieName('');
  };

  return (
    <div className="page">
      <h2>My StreamList</h2>
      <p>Add a movie or show to your streaming list.</p>

      <form onSubmit={handleSubmit} className="stream-form">
        <input
          type="text"
          placeholder="Enter a movie or show"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button type="submit">Add to List</button>
      </form>
    </div>
  );
}

export default StreamList;