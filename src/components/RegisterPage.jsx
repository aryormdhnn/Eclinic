import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../globalstyle.css';
import '../css/login.css';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
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

    setIsLoading(true);
    try {
      const response = await fetch(
        'https://6454643dc18adbbdfeb53cd7.mockapi.io/api/fe-11/user',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, email }),
        }
      );

      if (response.ok) {
        register(username);
        navigate('/');
      } else {
        setError('Registrasi tidak berhasil. Coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="reg-username">Username:</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="reg-password">Password:</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="reg-email">Email:</label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Mendaftar...' : 'Register'}
        </button>
      </form>

      <p className="text-link">
        Sudah memiliki akun? <Link to="/login">Masuk</Link>
      </p>
    </div>
  );
};

export default RegisterPage;