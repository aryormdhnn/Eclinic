import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "../css/dokter.css";
import "../css/detailDokter.css";
import { Icon } from "@iconify/react";
import LoadingSpinner from "./ui/LoadingSpinner";
import { FaStar } from "react-icons/fa";

import docF1 from "../assets/doc_f1.png";
import docM1 from "../assets/doc_m1.png";
import docF2 from "../assets/doc_f2.png";
import docM2 from "../assets/doc_m2.png";
import docF3 from "../assets/doc_f3.png";
import docM3 from "../assets/doc_m3.png";
import docF4 from "../assets/doc_f4.png";
import docM4 from "../assets/doc_m4.png";

const localDoctorImages = [docF1, docM1, docF2, docM2, docF3, docM3, docF4, docM4];

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
      .then((res) => {
        let data = res.data;
        const VALID_SPECIALTIES = [
          'Umum', 'Mata', 'Jiwa', 'Otak', 'Kandungan',
          'Anak', 'Penyakit Dalam', 'THT', 'Ortopedi',
          'Paru', 'Bedah Umum', 'Jantung',
        ];
        if (!VALID_SPECIALTIES.includes(data.job)) {
          const hash = (parseInt(data.id) || 0) + (data.name ? data.name.length : 0);
          data.job = VALID_SPECIALTIES[hash % VALID_SPECIALTIES.length];
        }
        setUserDetail(data);
      })
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
          <div className="card-profil-dokter">
            <div className="card-profil-img">
              <img
                src={localDoctorImages[parseInt(id) % localDoctorImages.length] || userDetail.avatar}
                alt={`Foto dr. ${userDetail.name}`}
                className="dokter-image"
              />
            </div>
            <div className="card-profil-body">
              <div className="doctor-header-status">
                <h3>dr. {userDetail.name}</h3>
                <span className="online-status">
                  <span className="status-dot"></span> Online & Siaga
                </span>
              </div>
              <p>{userDetail.job}</p>
              <div className="icon-star">
                <p>{userDetail.rating || "4.8"}</p>
                <FaStar className="ic-star" />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="card-profil-detail">
            <div className="section-detail-profil">
              <h3>Tentang Dokter</h3>
              <p>
                dr. {userDetail.name} adalah seorang dokter spesialis {userDetail.job} yang 
                berpengalaman dan berdedikasi tinggi. Beliau siap memberikan layanan konsultasi 
                kesehatan online yang profesional, aman, dan terpercaya sesuai dengan keluhan Anda.
              </p>
            </div>
            
            <div className="section-detail-profil">
              <h3>Pendidikan Terakhir</h3>
              <span>Universitas Kedokteran Terkemuka</span>
            </div>
          </div>
        </div>

        {/* Consultation Form Card */}
        {renderBookingForm()}
      </div>
    </div>
  );
};

export default UserDetail;
