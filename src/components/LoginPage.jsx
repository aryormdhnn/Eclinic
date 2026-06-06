import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from '../context/AuthContext';
import "../globalstyle.css";
import "../css/login.css";

import logoEclinic from "../assets/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fix #4 & #11: Use Supabase session from AuthContext, not localStorage
  const handleLogout = async () => {
    await logout(); // Fix #11: calls supabase.auth.signOut()
    navigate('/'); // Fix #14: navigate smoothly, no page reload
  };

  if (user) {
    const displayName = user.user_metadata?.username || user.email.split('@')[0];
    return (
      <div className="auth-page-container">
        <div className="auth-card" style={{ textAlign: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0062ff, #60a5fa)',
            color: '#fff',
            fontSize: '32px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 4px 16px rgba(0, 98, 255, 0.25)'
          }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', margin: '0 0 6px' }}>
              {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
            </h2>
            <p style={{ color: '#66707a', fontSize: '14px', margin: 0 }}>Pasien eClinic</p>
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#edf2f8' }} />
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#1a2530' }}>
              <span>Status Akun:</span>
              <span style={{ color: '#00a376', fontWeight: '600' }}>Aktif</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#1a2530' }}>
              <span>Email:</span>
              <span style={{ color: '#64748b' }}>{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#ff4d4f',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Keluar dari Akun
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Email dan password harus diisi.");
      return;
    }

    setIsLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Login gagal: " + signInError.message);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
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
          <h2>Selamat Datang Kembali</h2>
          <p>Silakan masuk ke akun eClinic Anda untuk melanjutkan.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error" role="alert">
              <FaInfoCircle /> {error}
            </div>
          )}

          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Masuk ke Akun"}
          </button>
        </form>

        <p className="auth-link-text">
          Belum memiliki akun? <Link to="/register">Daftar Sekarang</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
