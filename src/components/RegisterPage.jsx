import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import '../globalstyle.css';
import '../css/login.css';

import logoEclinic from "../assets/logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
      setError('Username, password, dan email harus diisi.');
      return;
    }

    // Fix #5: Validate minimum password length
    if (password.length < 6) {
      setError('Password minimal harus 6 karakter.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid.');
      return;
    }

    setIsLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.trim()
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <Link to="/" className="auth-back-home" aria-label="Kembali ke Beranda">
        <FaChevronLeft /> Kembali ke Beranda
      </Link>

      <div className="auth-card">
        <div className="auth-logo">
          <Link to="/">
            <img src={logoEclinic} alt="eClinic Logo" />
          </Link>
        </div>

        <div className="auth-form-header">
          <h2>Buat Akun Baru</h2>
          <p>Lengkapi formulir di bawah ini untuk bergabung dengan eClinic.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error" role="alert">
              <FaInfoCircle /> {error}
            </div>
          )}

          <div className="auth-form-group">
            <label htmlFor="reg-username">Username</label>
            <input
              type="text"
              id="reg-username"
              placeholder="Buat username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="reg-email">Email Address</label>
            <input
              type="email"
              id="reg-email"
              placeholder="contoh: budi@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="reg-password">Password</label>
            <input
              type="password"
              id="reg-password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? "Mendaftarkan..." : "Daftar Akun"}
          </button>
        </form>

        <p className="auth-link-text">
          Sudah memiliki akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;