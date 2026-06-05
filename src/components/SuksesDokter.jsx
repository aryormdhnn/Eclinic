import React from 'react';
import { Button } from 'react-bootstrap';
import sukses from '../assets/sukses.png';
import '../css/sukses.css';

export const SuksesDokter = () => {
  return (
    <div>
      <div className="suksesorder">
        <img src={sukses} alt="" className="image-sukses" />
        <h2>Sesi Konsultasi Anda Telah Aktif!</h2>
        <h5>Pembayaran Anda terverifikasi. Dokter spesialis Anda siap melayani Anda sekarang di ruang obrolan virtual.</h5>
        <Button variant="primary" className='bt-sukses' href="/chat">
          Mulai Chat Sekarang
        </Button>
      </div>
    </div>
  );
};

export default SuksesDokter;
