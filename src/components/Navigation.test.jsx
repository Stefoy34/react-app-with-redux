/*
 * Skenario Pengujian untuk Komponen <Navigation />
 *
 * - Kriteria 1.2 (Tes #1 - dari file ini)
 * - Komponen Navigation
 * - Harap me-render link "Login" ketika authUser null (tamu).
 * - Harap tidak me-render tombol "Logout" ketika authUser null (tamu).
 *
 * - Kriteria 1.2 (Tes #2 - dari file ini)
 * - Komponen Navigation
 * - Harap me-render nama pengguna dan tombol "Logout" ketika authUser ada.
 * - Harap tidak me-render link "Login" ketika authUser ada.
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './Navigation';

vi.mock('react-redux', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useDispatch: vi.fn(),
  };
});

describe('Komponen <Navigation />', () => {
  const mockDispatch = vi.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const renderNav = (authUser) => {
    return render(
      <MemoryRouter>
        <Navigation authUser={authUser} />
      </MemoryRouter>
    );
  };

  it('harus me-render link Login untuk tamu', () => {
    renderNav(null);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('harus me-render nama pengguna dan tombol Logout saat login', () => {
    const authUser = { id: 'user-1', name: 'John Doe', avatar: '' };
    renderNav(authUser);

    expect(screen.getByText('Halo, John Doe')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});
