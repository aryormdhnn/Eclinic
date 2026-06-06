import React from 'react'
import Dokter from '../components/dokter'
import Footer from '../components/Footer'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../css/dokter.css'
import '../globalstyle.css'
import { Link } from 'react-router-dom';
import { FaUserMd, FaStar, FaComments } from 'react-icons/fa';

export const cariDokter = () => {
  return (
    <div>
      {/* Page Hero Strip */}
      <div className="page-hero-strip">
        <div className="page-hero-inner">

          {/* Breadcrumb */}
          <div className="bread-dokter">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to='/' className='bread-item'>Beranda</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className='bread-item-active'>Cari Dokter</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/* Title */}
          <h1 className="page-hero-title">Cari Dokter Spesialis</h1>
          <p className="page-hero-sub">
            Temukan dan konsultasi langsung dengan dokter terbaik secara online — cepat, aman, dan terpercaya.
          </p>

          {/* Stats chips */}
          <div className="page-hero-stats">
            <span className="hero-stat-chip">
              <FaUserMd className="hero-stat-chip-icon" />
              500+ Dokter Aktif
            </span>
            <span className="hero-stat-chip">
              <FaStar className="hero-stat-chip-icon" />
              Rata-rata 4.8 ★
            </span>
            <span className="hero-stat-chip">
              <FaComments className="hero-stat-chip-icon" />
              Respons &lt; 5 Menit
            </span>
          </div>

        </div>
      </div>

      {/* Doctor list */}
      <Dokter />

      <Footer />
    </div>
  )
}

export default cariDokter