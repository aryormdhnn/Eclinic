import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaRegCommentDots, 
  FaUserMd, 
  FaRegFileAlt,
  FaArrowRight
} from 'react-icons/fa';

import '../css/home.css';
import ImageCover from '../assets/dokter-cover.png';
import CardDokter from '../components/cardDokter';
import Artikel from '../components/artikel';
import BannerDaftar from '../components/BannerDaftar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-container">
      {/* 1. Modern Hero Section */}
      <section className="hero-banner">
        <div className="row align-items-center hero-row">
          <div className="col-lg-6 hero-text-col">
            <div className="hero-badge">Aplikasi Telemedicine Terpercaya</div>
            <h1 className="hero-title">
              Dapatkan Konsultasi Kesehatan <span className="hero-highlight">Kapan Saja</span>
            </h1>
            <p className="hero-description">
              Nikmati kemudahan berkonsultasi langsung dengan dokter spesialis berlisensi kami. 
              Cepat, aman, dan tanpa perlu mengantre lama di rumah sakit.
            </p>
            <div className="hero-actions">
              <Link to="/cari-dokter" className="btn btn-primary-hero">
                Cari Dokter Sekarang <FaArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 hero-img-col text-center">
            <div className="hero-img-wrapper">
              <img src={ImageCover} alt="Dokter Konsultasi Online" className="hero-img" />
              <div className="hero-stat-card">
                <div className="stat-icon"><FaUserMd /></div>
                <div>
                  <strong>500+</strong>
                  <span>Dokter Spesialis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Layanan Kesehatan Kami */}
      <section className="services-section">
        <div className="section-header text-center">
          <span className="section-subtitle">Layanan Utama</span>
          <h2 className="section-title">Kebutuhan Kesehatan Anda</h2>
          <p className="section-description">
            Kami menyediakan solusi medis holistik untuk memudahkan Anda dan keluarga mendapatkan perawatan terbaik.
          </p>
        </div>
        <div className="row services-grid">
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon consult"><FaCalendarAlt /></div>
              <h4>Booking Dokter</h4>
              <p>Jadwalkan sesi konsultasi video atau chat interaktif dengan dokter spesialis handal pilihan Anda.</p>
              <Link to="/cari-dokter" className="service-link">
                Buat Janji Temu <FaArrowRight />
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon chat"><FaRegCommentDots /></div>
              <h4>Super Chat Medis</h4>
              <p>Tanya jawab langsung dan instan mengenai keluhan kesehatan Anda dengan tim dokter siaga kami.</p>
              <Link to="/chat" className="service-link">
                Konsultasi Sekarang <FaArrowRight />
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon article"><FaRegFileAlt /></div>
              <h4>Artikel Kesehatan</h4>
              <p>Temukan artikel medis terpercaya mengenai pola makan sehat, kebugaran, dan info pencegahan penyakit.</p>
              <Link to="/artikel" className="service-link">
                Baca Artikel <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recommended Doctors Section */}
      <div className="home-sub-section">
        <CardDokter />
      </div>



      {/* 5. Health Articles Section */}
      <div className="home-sub-section">
        <Artikel />
      </div>

      {/* 6. Action Banner (CTA) */}
      <div className="home-sub-section">
        <BannerDaftar />
      </div>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default Home;
