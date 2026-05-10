import React from 'react';

function About() {
  return (
    <div className="page">
      <section className="hero-banner">
        <div className="film-strip">▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮</div>
        <h2>About EZTechMovie</h2>
        <p>A progressive web application designed to centralize movie discovery, watchlist management, and subscription activity.</p>
      </section>

      <section className="about-section">
        <h2>Project Overview</h2>
        <p>
          EZTechMovie is a React-based progressive web application built as a capstone prototype.
          The application allows users to search movie data, build a personalized watchlist,
          manage subscription products, and experience persistent data through localStorage.
        </p>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>🎬 Movie Discovery</h3>
          <p>Users can search movies through the TMDB API and review posters, ratings, release years, genres, cast members, and summaries.</p>
        </div>

        <div className="feature-card">
          <h3>📋 Smart Watchlist</h3>
          <p>The watchlist supports filtering, sorting, completion tracking, sharing, CSV export, and persistent storage.</p>
        </div>

        <div className="feature-card">
          <h3>🛒 Subscription Cart</h3>
          <p>The cart allows product management, quantity adjustments, pricing totals, and subscription business-rule validation.</p>
        </div>

        <div className="feature-card">
          <h3>📱 PWA Ready</h3>
          <p>The app includes manifest and service worker support so it can operate more like a desktop-installable application.</p>
        </div>
      </section>

      <section className="about-section">
        <h2>Business Value</h2>
        <p>
          This prototype demonstrates how EZTechMovie could create a single customer-facing platform
          for discovering entertainment, organizing user preferences, managing subscription options,
          and supporting future streaming or payment integrations.
        </p>
      </section>
    </div>
  );
}

export default About;