import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "../css/dokter.css";
import "../css/detailDokter.css";
import { Icon } from "@iconify/react";
import LoadingSpinner from "./ui/LoadingSpinner";

const UserDetail = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const { id } = useParams();
  const { handleScheduleChange, updateInputValue } = useContext(UserContext);

  const [userDetail, setUserDetail] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState("Sesi Instan (Langsung Mulai)");
  const [selectedConsultFilter, setSelectedConsultFilter] = useState("Chat Online (Instan)");
  const [isScheduleConfirmed, setIsScheduleConfirmed] = useState(false);

  useEffect(() => {
    axios
      .get(`https://64527770a2860c9ed40d2a69.mockapi.io/doctor/${id}`)
      .then((res) => setUserDetail(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!userDetail) return <LoadingSpinner />;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleScheduleChange(selectedFeature);
    updateInputValue(selectedConsultFilter);
    setIsScheduleConfirmed(true);
  };

  const renderBookingForm = () => (
    <div className="card-order">
      <h3>Tipe Konsultasi</h3>
      <div className="type-consult">
        <Icon icon="carbon:chat" className="ic" />
        <select
          value={selectedConsultFilter}
          onChange={(e) => setSelectedConsultFilter(e.target.value)}
          aria-label="Pilih tipe konsultasi"
        >
          <option value="Chat Online (Instan)">Chat Online (Instan)</option>
          <option value="Panggilan Video (Online)">Panggilan Video (Online)</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="instant-consult-info">
          <Icon icon="bi:info-circle-fill" className="info-icon-blue" />
          <span>Sesi instan langsung terhubung dengan dokter tanpa antrean.</span>
        </div>

        <button
          type="submit"
          className={isScheduleConfirmed ? "clicked" : "button-form"}
          disabled={isScheduleConfirmed}
        >
          {isScheduleConfirmed ? "Sesi Dikonfirmasi ✓" : "Konfirmasi Sesi Chat"}
        </button>

        <div className="next-page">
          {!isScheduleConfirmed ? (
            <span className="disabled">Lanjutkan ke Pembayaran</span>
          ) : loggedInUser ? (
            <Link
              className="button-form"
              to={`/order-dokter/${userDetail.id}`}
            >
              Lanjutkan ke Pembayaran
            </Link>
          ) : (
            <Link className="button-form" to="/login">
              Masuk untuk Melanjutkan
            </Link>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="profil-dokter">
        <div className="profil-detail">
          {/* Doctor Profile Card */}
          <div className="card-profil-dokter">
            <div className="card-profil-img">
              <img
                src={userDetail.avatar}
                alt={`Foto dr. ${userDetail.name}`}
                className="dokter-image"
              />
            </div>
            <div className="card-profil-body">
              <div className="doctor-header-status">
                <h3>dr. {userDetail.name}</h3>
                <span className="status-badge-online">
                  <span className="pulsing-dot-green"></span> Online & Siaga
                </span>
              </div>
              <p>{userDetail.job}</p>
              <div className="icon-star">
                <p>{userDetail.rating}</p>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} className="ic-star" icon="ic:outline-star" />
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form (Visible on Mobile) */}
          {renderBookingForm()}

          {/* Doctor Info */}
          <div className="card-profil-detail">
            <h3>Tentang Dokter</h3>
            <p>{userDetail.about}</p>
            <h3>Pendidikan Terakhir</h3>
            <h6>{userDetail.educate}</h6>
            <p>{userDetail.date}</p>
          </div>
        </div>

        {/* Booking Form Sidebar (Visible on Desktop) */}
        <div className="order-dokter">
          {renderBookingForm()}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
