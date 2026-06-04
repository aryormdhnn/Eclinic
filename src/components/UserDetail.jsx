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
  const [selectedFeature, setSelectedFeature] = useState("");
  const [selectedConsultFilter, setSelectedConsultFilter] = useState("Konsultasi Chat");
  const [isScheduleConfirmed, setIsScheduleConfirmed] = useState(false);

  useEffect(() => {
    axios
      .get(`https://64527770a2860c9ed40d2a69.mockapi.io/doctor/${id}`)
      .then((res) => setUserDetail(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!userDetail) return <LoadingSpinner />;

  const scheduleOptions = [
    { day: userDetail.day1, date: userDetail.date1 },
    { day: userDetail.day2, date: userDetail.date2 },
    { day: userDetail.day3, date: userDetail.date3 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFeature) return;
    handleScheduleChange(selectedFeature);
    updateInputValue(selectedConsultFilter);
    setIsScheduleConfirmed(true);
  };

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
              <h3>{userDetail.name}</h3>
              <p>{userDetail.job}</p>
              <div className="icon-star">
                <p>{userDetail.rating}</p>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} className="ic-star" icon="ic:outline-star" />
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="card-order">
            <h3>Tipe Konsultasi</h3>
            <div className="type-consult">
              <Icon icon="carbon:chat" className="ic" />
              <select
                value={selectedConsultFilter}
                onChange={(e) => setSelectedConsultFilter(e.target.value)}
                aria-label="Pilih tipe konsultasi"
              >
                <option value="Konsultasi Video">Konsultasi Video</option>
                <option value="Konsultasi Chat">Konsultasi Chat</option>
              </select>
            </div>

            <h3>Jadwal Konsultasi</h3>
            <form onSubmit={handleSubmit}>
              {scheduleOptions.map(({ day, date }) => {
                const value = `${day}, ${date.substring(0, 10)}`;
                return (
                  <label key={day} className="jadwal-btn">
                    <input
                      type="radio"
                      value={value}
                      checked={selectedFeature === value}
                      onChange={(e) => setSelectedFeature(e.target.value)}
                    />
                    {day}, {date.substring(0, 10)}
                  </label>
                );
              })}

              <button
                type="submit"
                className={isScheduleConfirmed ? "clicked" : "button-form"}
                disabled={isScheduleConfirmed || !selectedFeature}
              >
                {isScheduleConfirmed ? "Jadwal Dipilih ✓" : "Pilih Jadwal"}
              </button>

              <div className="next-page">
                {!isScheduleConfirmed ? (
                  <span className="disabled">Lanjutkan Pemesanan</span>
                ) : loggedInUser ? (
                  <Link
                    className="button-form"
                    to={`/order-dokter/${userDetail.id}`}
                  >
                    Lanjutkan Pemesanan
                  </Link>
                ) : (
                  <Link className="button-form" to="/login">
                    Masuk untuk Melanjutkan
                  </Link>
                )}
              </div>
            </form>
          </div>

          {/* Doctor Info */}
          <div className="card-profil-detail">
            <h3>Tentang Dokter</h3>
            <p>{userDetail.about}</p>
            <h3>Pendidikan Terakhir</h3>
            <h6>{userDetail.educate}</h6>
            <p>{userDetail.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
