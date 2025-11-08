// src/App.jsx

// Perubahan kecil untuk memicu CI
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from '@dimasmds/react-redux-loading-bar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';

import Navigation from './components/Navigation';

import { asyncPreloadProcess } from './states/auth/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="app-loading">
        <h2>Memuat Aplikasi...</h2>
        <LoadingBar />
      </div>
    );
  }

  return (
    <div className="App">
      <LoadingBar />
      <header>
        <Navigation authUser={authUser} />
      </header>
      <main>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:threadId" element={<DetailPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />

          {/* Rute Khusus Tamu (Guest-only) */}
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <RegisterPage />}
          />

          {/* Rute Khusus Pengguna (Auth-only) */}
          <Route
            path="/new"
            element={authUser ? <CreateThreadPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
