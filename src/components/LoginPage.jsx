import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../globalstyle.css";
import "../css/login.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
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

    if (username.trim() === "" || password.trim() === "") {
      setError("Username dan password harus diisi.");
      return;
    }

    setIsLoading(true);
    try {
      // GET all users then filter — MockAPI doesn't support credential-based auth
      const response = await fetch(
        "https://6454643dc18adbbdfeb53cd7.mockapi.io/api/fe-11/user"
      );

      if (!response.ok) {
        throw new Error("Gagal menghubungi server.");
      }

      const users = await response.json();
      const matchedUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (matchedUser) {
        login(matchedUser.username);
        navigate("/");
      } else {
        setError("Username atau password salah.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi nanti.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Masuk</h2>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Memuat..." : "Login"}
        </button>
      </form>

      <p className="text-link">
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </div>
  );
};

export default LoginPage;
