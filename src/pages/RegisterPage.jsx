import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import useInput from '../hooks/useInput';
import { asyncRegisterUser } from '../states/auth/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onRegister = async (event) => {
    event.preventDefault();

    const success = await dispatch(asyncRegisterUser({ name, email, password }));

    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="register-page">
      <h2>Halaman Registrasi</h2>
      <form onSubmit={onRegister} className="register-form">
        <label htmlFor="name">Nama</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Nama Anda"
          required
        />

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
          autoComplete="new-password"
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
