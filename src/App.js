import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';

import Movies from './pages/Movies';
import StreamList from './pages/StreamList';
import Cart from './pages/Cart';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* Default Landing Page */}
          <Route path="/" element={<Movies />} />

          {/* Discover Movies */}
          <Route path="/movies" element={<Movies />} />

          {/* Watchlist */}
          <Route path="/watchlist" element={<StreamList />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* About */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;