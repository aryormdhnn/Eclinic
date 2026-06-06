import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaRegCommentDots, 
  FaUserMd, 
  FaRegFileAlt,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

import '../css/home.css';
import ImageCover from '../assets/dokter-cover.png';
import CardDokter from '../components/cardDokter';
import Artikel from '../components/artikel';
import Footer from '../components/Footer';

const faqData = [
  {
    q: 'Bagaimana cara memulai konsultasi dengan dokter?',
    a: 'Cukup pilih dokter yang sesuai kebutuhan Anda, klik "Chat Sekarang", dan Anda akan langsung terhubung dalam sesi konsultasi online tanpa perlu membuat janji temu.',
  },
  {
    q: 'Apakah dokter yang tersedia sudah berlisensi resmi?',
    a: 'Ya, seluruh dokter di eClinic telah terverifikasi dan memiliki Surat Tanda Registrasi (STR) yang masih aktif dari Konsil Kedokteran Indonesia.',
  },
  {
    q: 'Berapa biaya konsultasi per sesi?',
    a: 'Biaya konsultasi bervariasi tergantung spesialisasi dokter. Anda dapat melihat tarif secara transparan di halaman profil setiap dokter sebelum memulai sesi.',
  },
  {
    q: 'Apakah riwayat konsultasi saya tersimpan?',
    a: 'Ya, seluruh riwayat percakapan dan konsultasi Anda tersimpan dengan aman di akun pribadi Anda dan dapat diakses kapan saja.',
  },
  {
    q: 'Berapa lama waktu respons dokter?',
    a: 'Dokter kami umumnya merespons dalam hitungan menit. Semua dokter yang aktif ditandai dengan status "Online" sehingga Anda tahu mereka siap menjawab.',
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        {open ? <FaChevronUp className="faq-chevron" /> : <FaChevronDown className="faq-chevron" />}
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      {/* 1. Modern Hero Section */}
      <section className="hero-banner">
        <div className="row align-items-center hero-row">
          <div className="col-lg-6 hero-text-col">
            <div className="hero-badge">Konsultasi Dokter Online 24/7</div>
            <h1 className="hero-title">
              Tanya Dokter Spesialis <span className="hero-highlight">Kapan Saja, Di Mana Saja</span>
            </h1>
            <p className="hero-description">
              Hubungi dokter spesialis berlisensi secara instan melalui chat medis atau video call online. Respons cepat, aman, dan tanpa perlu membuat janji temu fisik.
            </p>
            <div className="hero-actions">
              <Link to="/cari-dokter" className="btn btn-primary-hero">
                Mulai Tanya Dokter <FaArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 hero-img-col text-center">
            <div className="hero-img-wrapper">
              <img src={ImageCover} alt="Tanya Dokter Online" className="hero-img" />
              <div className="hero-stat-card">
                <div className="stat-icon"><FaUserMd /></div>
                <div>
                  <strong>500+</strong>
                  <span>Dokter Online</span>
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
          <h2 className="section-title">Konsultasi Medis Online</h2>
          <p className="section-description">
            Kami menyediakan solusi telemedicine modern untuk memudahkan Anda berkonsultasi secara privat dengan dokter spesialis terbaik secara langsung.
          </p>
        </div>
        <div className="row services-grid">
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon chat"><FaRegCommentDots /></div>
              <h4>Chat Dokter Spesialis</h4>
              <p>Mulai sesi chat interaktif instan untuk menanyakan keluhan kesehatan Anda langsung kepada ahlinya.</p>
              <Link to="/cari-dokter" className="service-link">
                Mulai Chat <FaArrowRight />
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon consult"><FaCalendarAlt /></div>
              <h4>Panggilan Video Medis</h4>
              <p>Lakukan sesi video call online tatap muka untuk konsultasi visual yang lebih mendalam dengan dokter kami.</p>
              <Link to="/cari-dokter" className="service-link">
                Mulai Video Call <FaArrowRight />
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

      {/* 4. Health Articles Section */}
      <div className="home-sub-section">
        <Artikel />
      </div>

      {/* 5. FAQ Section */}
      <section className="faq-section">
        <div className="faq-inner">
          <div className="section-header text-center faq-header">
            <span className="section-subtitle">Pertanyaan Umum</span>
            <h2 className="section-title">Ada yang Ingin Anda Ketahui?</h2>
            <p className="section-description">
              Temukan jawaban atas pertanyaan yang paling sering diajukan seputar layanan konsultasi online eClinic.
            </p>
          </div>
          <div className="faq-list">
            {faqData.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default Home;
