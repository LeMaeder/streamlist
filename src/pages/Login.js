import React from 'react';

import {
  useNavigate
} from 'react-router-dom';

function Login({ onLogin }) {

  const navigate = useNavigate();

  const handleDemoLogin = () => {

    onLogin();

    navigate('/movies');
  };

  const handleGoogleLogin = () => {

    onLogin();

    navigate('/movies');
  };

  return (

    <div className="page">

      <section className="hero-banner">

        <div className="film-strip">
          ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮
        </div>

        <h2>EZTechMovie Login</h2>

        <p>
          Secure authentication access portal.
        </p>

      </section>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '40px'
        }}
      >

        <button
          onClick={handleGoogleLogin}
          style={{
            border: 'none',
            borderRadius: '999px',
            padding: '18px 40px',
            background:
              'linear-gradient(90deg,#1d4ed8,#3b82f6)',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '320px'
          }}
        >
          Sign In With Google
        </button>

        <button
          onClick={handleDemoLogin}
          style={{
            border: 'none',
            borderRadius: '999px',
            padding: '18px 40px',
            background:
              'linear-gradient(90deg,#92400e,#f59e0b)',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '320px'
          }}
        >
          Demo Login
        </button>

      </div>

    </div>
  );
}

export default Login;