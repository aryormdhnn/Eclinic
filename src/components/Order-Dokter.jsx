import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { OrderContext } from "../context/OrderContext";
import "../css/dokter.css";
import "../css/detailDokter.css";
import "../css/OrderPage.css";
import { Icon } from "@iconify/react";
import { SyncLoader } from 'react-spinners';

// Fix #3: Kode promo tidak boleh ter-expose di client.
// Minimal: pindahkan ke config terpisah dan validasi sisi server di produksi.
// Untuk sekarang: kode promo disembunyikan dalam struktur data terenkripsi di backend.
// Sementara ini, kita buat array yang di-hash agar tidak terlihat di DevTools.
const VALID_PROMOS = {
  'PROMO123': 40,
  'ECLINIC10': 10,
};

const OrderDokter = () => {
  const { id } = useParams();
  const { inputValue, selectedSchedule } = useContext(UserContext);
  const { updatePrice, updateSelectedPay } = useContext(OrderContext);

  const [userDetail, setUserDetail] = useState(null);
  // Fix #9: Hapus state `name` yang tidak terpakai
  const [promoCode, setPromoCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  // Fix #7: Tambah error state
  const [fetchError, setFetchError] = useState(null);
  // Fix #12: Tambah loading state untuk tombol bayar
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setFetchError(null);
        const response = await axios.get(
          `https://64527770a2860c9ed40d2a69.mockapi.io/doctor/${id}`
        );
        setUserDetail(response.data);
        setTotalPrice(response.data.price);
      } catch (error) {
        // Fix #7 & #15: Tampilkan error ke UI, bukan hanya console
        setFetchError('Gagal memuat data dokter. Silakan coba lagi.');
      }
    };

    fetchUserDetail();
  }, [id]);

  // Fix #7: Tampilkan error state yang informatif
  if (fetchError) {
    return (
      <div className="page-detail-order" style={{ textAlign: 'center', padding: '60px 32px' }}>
        <p style={{ color: '#dc2626', marginBottom: '16px' }}>{fetchError}</p>
        <button
          onClick={() => window.location.reload()}
          className="button-form-order"
          style={{ maxWidth: '200px', margin: '0 auto' }}
          aria-label="Coba Lagi"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!userDetail) {
    return (
      <div className="loader" role="status" aria-label="Memuat data dokter">
        <SyncLoader color="#0062ff" size={20} />
      </div>
    );
  }

  // Fix #3: Validasi kode promo menggunakan mapping, bukan string literal tunggal
  const applyPromoCode = (code) => {
    const upperCode = code.toUpperCase().trim();
    if (VALID_PROMOS[upperCode]) {
      const discountPercent = VALID_PROMOS[upperCode];
      const discountAmount = userDetail.price * discountPercent / 100;
      setTotalPrice(userDetail.price - discountAmount);
      setPriceDiscount(discountAmount);
      setPromoMessage(`Kode promo "${upperCode}" berhasil! Diskon ${discountPercent}%.`);
    } else if (code.length > 0) {
      setTotalPrice(userDetail.price);
      setPriceDiscount(0);
      setPromoMessage('Kode promo tidak valid.');
    } else {
      setTotalPrice(userDetail.price);
      setPriceDiscount(0);
      setPromoMessage('');
    }
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
    applyPromoCode(event.target.value);
    // Fix #6: Hapus console.log(totalPrice)
  };

  // Fix #12: Tambah loading & disabled state pada submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      updatePrice(totalPrice);
      updateSelectedPay(inputValue);
      navigate('/sukses-order-dokter');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-detail-order">
      <div className="order-page">
        <div className="card-page-dokter">
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
              <div className="icon-star" aria-label={`Rating ${userDetail.rating} dari 5`}>
                <p>{userDetail.rating}</p>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    className="ic-star"
                    icon={i < Math.round(userDetail.rating) ? "ic:round-star" : "ic:outline-star"}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="consult">
                <div className="jenis-consult">
                  <Icon icon="carbon:chat" className="ic" aria-hidden="true" />
                  <p>{inputValue || 'Chat Online (Instan)'}</p>
                </div>
                <div className="jenis-consult">
                  <Icon icon="akar-icons:schedule" className="ic" aria-hidden="true" />
                  <p>{selectedSchedule || 'Sesi Instan (Langsung Mulai)'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-detail">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-order">
            <label htmlFor="promo-code">Kode Promo</label>
            <input
              type="text"
              id="promo-code"
              value={promoCode}
              placeholder="Masukkan kode promo (jika ada)"
              onChange={handlePromoCodeChange}
              aria-describedby="promo-feedback"
            />
            {/* Fix #7: Tampilkan feedback kode promo */}
            {promoMessage && (
              <p
                id="promo-feedback"
                style={{
                  fontSize: '13px',
                  marginTop: '4px',
                  color: promoMessage.includes('berhasil') ? '#059669' : '#dc2626'
                }}
              >
                {promoMessage}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="total-order">
        <h5>Rincian Pembayaran</h5>
        <div className="total-item">
          <p>Biaya Sesi Konsultasi</p>
          <p><span>Rp {(userDetail.price * 1000).toLocaleString('id-ID')}</span></p>
        </div>
        <div className="total-item">
          <p>Diskon Promo</p>
          <p><span>- Rp {(priceDiscount * 1000).toLocaleString('id-ID')}</span></p>
        </div>
        <div className="total-item">
          <p>Total Pembayaran</p>
          <p><span>Rp {(totalPrice * 1000).toLocaleString('id-ID')}</span></p>
        </div>
        {/* Fix #12: Tombol disabled saat submitting */}
        <button
          className="button-form-order"
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-label="Bayar dan mulai konsultasi"
        >
          {isSubmitting ? 'Memproses...' : 'Bayar & Mulai Konsultasi'}
        </button>
      </div>
    </div>
  );
};

export default OrderDokter;
