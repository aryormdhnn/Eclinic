import React from 'react'
import Dokter from '../components/dokter'
import Footer from '../components/Footer'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../css/dokter.css'
import '../globalstyle.css'
import '../css/footer.css'
import { Link } from 'react-router-dom';

export const cariDokter = () => {
  return (
    <div className='cari-dokter-page'>
      <div className="bread-dokter">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/' className='bread-item'>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active="active" className='bread-item-active'>Dokter</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Cari Dokter Spesialis</h1>
      </div>
      <Dokter />
      <Footer />
    </div>
  )
}

export default cariDokter