import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/auth/action';

function Navigation({ authUser }) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <nav className="navigation">
      <Link to="/">Beranda</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      {authUser ? (
        <div className="nav-authed">
          <Link to="/new">Buat Thread</Link>
          <span>Halo, {authUser.name}</span>
          <button type="button" onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-guest">
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
