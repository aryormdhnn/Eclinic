import React from 'react';
import { Link } from 'react-router-dom';
import UserDetail from '../components/UserDetail';
import Footer from '../components/Footer';


const ProfilDokter = () => {
  return (
      <div>
      <div className="page-hero-strip">
        <div className="page-hero-inner">
          <div className="bread-dokter">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to='/' className='bread-item'>Beranda</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to='/cari-dokter' className='bread-item'>Cari Dokter</Link>
              </li>
              <li className='breadcrumb-item bread-item-active'>Profil Dokter</li>
            </ol>
          </div>
          <h1 className="page-hero-title">Profil Dokter</h1>
          <p className="page-hero-sub">Detail spesialisasi, jadwal, dan konsultasi online.</p>
        </div>
      </div>
    <UserDetail />
    <Footer />

    </div>
  );
};

export default ProfilDokter;

