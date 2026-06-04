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



const OrderDokter = () => {
  const { id } = useParams();
  const { users, inputValue, selectedSchedule } = useContext(UserContext);
  const { updatePrice, updateSelectedPay, setPrice, setSelectedPay } = useContext(OrderContext);
  const [userDetail, setUserDetail] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [promoCode, setPromoCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(
          `https://64527770a2860c9ed40d2a69.mockapi.io/doctor/${id}`
        );
        setUserDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (!userDetail) {
    return (
      <div className="loader">
        <SyncLoader color="#36d7b7" size={24} />
      </div>
    );
  }


  const applyPromoCode = (code) => {

    if (code === 'PROMO123') {
      // Jika kode promo benar, potong harga dengan diskon 20%
      const discountedPrice = userDetail.price - (userDetail.price * 40 / 100);
      setTotalPrice(discountedPrice);
      setPriceDiscount(userDetail.price * 40 / 100)
    } else {
      setTotalPrice(userDetail.price)
      // Jika kode promo salah, tampilkan pesan error atau lakukan tindakan lain
      // ...
    }
  };

  const handlePay = (event) => {
    applyPromoCode(event.target.value);

    setCategory(event.target.value);
  };


  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
    applyPromoCode(event.target.value);
    console.log(totalPrice)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePrice(totalPrice);
    updateSelectedPay(category);
  
    navigate('/sukses-order-dokter');
  };
  


  return (
    <div className="page-detail-order">
      <div className="order-page">
        <div className="card-page-dokter">
          <div className="card-profil-dokter">
            <div className="card-profil-img">
              <img
                src={userDetail.avatar}
                alt="Gambar"
                className="dokter-image"
              />
            </div>
            <div className="card-profil-body">
              <h3>{userDetail.name}</h3>
              <p>{userDetail.job}</p>
              <div className="icon-star">
                <p>{userDetail.rating}</p>
                <Icon className="ic-star" icon="ic:outline-star" />
                <Icon className="ic-star" icon="ic:outline-star" />
                <Icon className="ic-star" icon="ic:outline-star" />
                <Icon className="ic-star" icon="ic:outline-star" />
                <Icon className="ic-star" icon="ic:outline-star" />
              </div>

              <div className="consult">
                <div className="jenis-consult">
                  <Icon icon="carbon:chat" className="ic" />
                  <p>{inputValue}</p>
                </div>
                <div className="jenis-consult">
                  <Icon icon="akar-icons:schedule" className="ic ic-chat" />
                  <p>{selectedSchedule}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-detail">
        <form>
          <div className="form-order">
            <label>Kode Promo</label>
            <input
              type="text"
              value={promoCode}
              placeholder="Masukkan Kode Promo 40%"
              onChange={handlePromoCodeChange}
            />
          </div>
        </form>
      </div>

      <div className="total-order">
        <h5>Total Pembayaran</h5>
        <div className="total-item">
          <p>Biaya Transaksi</p>
          <p>
           <span>Rp. {(userDetail.price* 1000).toLocaleString()}</span>
          </p>
        </div>
        <div className="total-item">
          <p>Promo</p>
          <p>{priceDiscount}</p>
        </div>
        <div className="total-item">
          <p>Total Harga</p>
          <p>{totalPrice}</p>
        </div>
        <button className="button-form-order" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default OrderDokter;
