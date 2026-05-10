import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';

import Movies from './pages/Movies';
import StreamList from './pages/StreamList';
import Cart from './pages/Cart';
import About from './pages/About';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

function ProtectedRoute({ children, loggedIn }) {

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    const savedLogin =
      localStorage.getItem('loggedIn') === 'true';

    setLoggedIn(savedLogin);

  }, []);

  const handleLogin = () => {

    localStorage.setItem(
      'loggedIn',
      'true'
    );

    setLoggedIn(true);
  };

  const handleLogout = () => {

    localStorage.removeItem('loggedIn');

    setLoggedIn(false);
  };

  return (

    <Router>

      <div className="App">

        {loggedIn && (
          <Navbar onLogout={handleLogout} />
        )}

        <Routes>

          <Route
            path="/login"
            element={
              loggedIn
                ? <Navigate to="/movies" />
                : <Login onLogin={handleLogin} />
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/watchlist"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <StreamList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <About />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </Router>
  );
}

export default App;