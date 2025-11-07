/*
 * Skenario Pengujian E2E untuk Alur Login (Kriteria 1.4)
 *
 * 1. Harap mengunjungi halaman login.
 * 2. Harap gagal login jika form di-submit dengan data yang salah (input kosong).
 * 3. Harap gagal login jika form di-submit dengan password yang salah.
 * 4. Harap berhasil login jika form di-submit dengan data yang benar.
 * 5. Setelah login berhasil, harap diarahkan ke halaman utama.
 * 6. Setelah login berhasil, harap menampilkan nama pengguna di navigasi.
 */

describe('Alur Login E2E', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[placeholder="Email Anda"]').should('be.visible');
    cy.get('input[placeholder="Password Anda"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Login').should('be.visible');
  });

  it ('harus menampilkan alert jika login dengan password salah', () => {
    cy.get('input[placeholder="Email Anda"]').type('akuntester-saya-123@dicoding.com');
    cy.get('input[placeholder="Password Anda"]').type('password-salah-banget');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.Equal('Email atau password salah');
    });
  });

  it('harus berhasil login dan mengarahkan ke halaman utama', () => {
    cy.get('input[placeholder="Email Anda"]').type('akuntester-saya-123@dicoding.com');
    cy.get('input[placeholder="Password Anda"]').type('password-aman-123');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.get('.navigation').should('contain', 'Halo, Akun Tester Saya');
  });
});
