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
