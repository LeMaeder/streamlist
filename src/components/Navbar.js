import React from 'react';

import {
  Link,
  NavLink
} from 'react-router-dom';

function Navbar() {

  return (

    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        🎬 EZTechMovie
      </Link>

      <div className="nav-links">

        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            isActive ? 'active-link' : ''
          }
        >
          Watchlist
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? 'active-link' : ''
          }
        >
          Discover Movies
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'active-link' : ''
          }
        >
          Cart
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'active-link' : ''
          }
        >
          About
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;