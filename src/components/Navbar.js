import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem('cart');
      const cart = saved ? JSON.parse(saved) : [];
      const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
      setCount(totalItems);
    };

    updateCount();

    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <h1 className="logo">EZTechMovie</h1>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">Cart ({count})</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;