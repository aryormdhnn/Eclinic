import '../css/carddokter.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://64527770a2860c9ed40d2a69.mockapi.io/doctor")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch(() => { /* API request failed silently; doctors list will remain empty */ });
  }, []);

  const displayedUsers = users.slice(0, 4);

  return (
    <div className="dokterRekomendasi">
      <div className="row dokter-header-row align-items-center">
        <div className="col-8">
          <h3 className="rekomendasi-title">Rekomendasi Dokter Spesialis</h3>
        </div>
        <div className="col-4 text-end">
          <Link to="/cari-dokter" className="btn-view-all">
            Lihat Semua
          </Link>
        </div>
      </div>
      <div className="dokter-daftar-grid">
        {displayedUsers.map((user, index) => (
          <div key={user.id || index} className="card-col-wrapper">
            <div className="card border-0 doctor-recommend-card">
              <div className="doctor-card-img-wrapper">
                <img
                  src={user.avatar}
                  alt={`dr. ${user.name}`}
                  className="dokter-image"
                />
                <div className="doctor-card-rating">
                  <FaStar className="star-icon" /> <span>{user.rating || "4.8"}</span>
                </div>
              </div>
              <div className="doctor-card-content">
                <h5 className="card-title">dr. {user.name.substring(0, 16)}</h5>
                <p className="card-text">{user.job}</p>
                <div className="card-price">
                  Mulai Dari <span className="price-tag">Rp {(user.price * 1000).toLocaleString('id-ID')}</span>
                </div>
                 <Link className="btn btn-consult-now" to={`/profil-dokter/${user.id}`}>
                  Chat Sekarang
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
