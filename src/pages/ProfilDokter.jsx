import React from 'react';
import { Link } from 'react-router-dom';
import UserDetail from '../components/UserDetail';
import Footer from '../components/Footer';


const ProfilDokter = () => {
  return (
      <div>
 
        <div className="bread-dokter">
         <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to='/' className='bread-item'>Home </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to='/cari-dokter' className='bread-item'>Dokter / </Link>
            </li>
            <li className='bread-item-active'> Profil Dokter</li>
          </ol>
          <h1>Profil Dokter</h1>
        </div>
    
    <UserDetail />
    <Footer />

    </div>
  );
};

export default ProfilDokter;

