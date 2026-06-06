import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import "../globalstyle.css";
import "../css/login.css";

import logoEclinic from "../assets/logo.png";
import loginIllustration from "../assets/login_illustration.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  if (loggedInUser) {
    return (
      <div className="login-form text-center" style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#00a376',
          color: '#fff',
          fontSize: '32px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 163, 118, 0.2)'
        }}>
          {loggedInUser.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            {loggedInUser.username.charAt(0).toUpperCase() + loggedInUser.username.slice(1)}
          </h2>
          <p style={{ color: '#78828A', fontSize: '14px', margin: 0 }}>Pasien eClinic</p>
        </div>
        <div style={{ width: '100%', height: '1px', backgroundColor: '#edf2f8', margin: '10px 0' }} />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#101827' }}>
            <span>Status Akun:</span>
            <span style={{ color: '#00a376', fontWeight: 'bold' }}>Aktif</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#101827' }}>
            <span>Tipe Layanan:</span>
            <span>Telekonsultasi</span>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          style={{ 
            width: '100%', 
            height: '48px', 
            backgroundColor: '#ff4d4f', 
            border: 'none', 
            borderRadius: '8px', 
            color: '#fff', 
            fontWeight: 'bold',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          Keluar dari Akun
        </button>
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
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        setError("Login gagal: " + signInError.message);
      } else {
        // Successful login
        navigate("/");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <Link to="/" className="auth-back-home">
        <FaChevronLeft /> Kembali ke Beranda
      </Link>

      {/* Center Card - Form */}
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
