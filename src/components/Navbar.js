import React from 'react';

import {
  Link,
  NavLink
} from 'react-router-dom';

function Navbar({ onLogout }) {

  return (

    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        🎬 EZTechMovie
      </Link>

      <div className="nav-links">

        <NavLink to="/watchlist">
          Watchlist
        </NavLink>

        <NavLink to="/movies">
          Discover Movies
        </NavLink>

        <NavLink to="/cart">
          Cart
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;