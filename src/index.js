import React from 'react';
import ReactDOM from 'react-dom/client';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>

    <GoogleOAuthProvider
      clientId="YOUR_GOOGLE_CLIENT_ID"
    >
      <App />
    </GoogleOAuthProvider>

  </React.StrictMode>
);

if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {

    navigator.serviceWorker
      .register('/service-worker.js')

      .then(registration => {

        console.log(
          'Service Worker registered:',
          registration
        );

      })

      .catch(error => {

        console.log(
          'Service Worker registration failed:',
          error
        );

      });

  });

}