import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import useInput from '../hooks/useInput';
import { asyncSetAuthUser } from '../states/auth/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onLogin = async (event) => {
    event.preventDefault();

    const success = await dispatch(asyncSetAuthUser({ email, password }));

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <h2>Halaman Login</h2>
      <form onSubmit={onLogin} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email Anda"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password Anda"
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default LoginPage;
