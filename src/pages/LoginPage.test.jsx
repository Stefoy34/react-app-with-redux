/*
 * Skenario Pengujian untuk Komponen <LoginPage />
 *
 * - Kriteria 1.3 (Tes #1)
 * - Komponen LoginPage
 * - Harap me-render form login (input email, password, dan tombol login)
 * dengan benar.
 *
 * - Kriteria 1.3 (Tes #2)
 * - Komponen LoginPage
 * - Harap memanggil fungsi dispatch ketika tombol login diklik.
 * - (Kita akan mock 'useDispatch' untuk memverifikasi panggilannya).
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import LoginPage from './LoginPage';
import * as authActions from '../states/auth/action';

vi.mock('react-redux', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useDispatch: vi.fn(),
  };
});

vi.mock('../states/auth/action', () => ({
  asyncSetAuthUser: vi.fn(),
}));

describe('Komponen <LoginPage />', () => {
  const mockDispatch = vi.fn();

  const renderComponent = () => {
    const store = configureStore({
      reducer: (state = {}) => state,
    });
    
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  };

  it('harus me-render form login dengan benar', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Email Anda')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password Anda')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('harus memanggil dispatch saat form di-submit', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText('Email Anda');
    const passwordInput = screen.getByPlaceholderText('Password Anda');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@email.com');
    await userEvent.type(passwordInput, 'testpassword');
    await userEvent.click(loginButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      authActions.asyncSetAuthUser({
        email: 'test@email.com',
        password: 'testpassword',
      })
    );
  });
});
