import React, { useContext, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import '../css/cart.css';
import { ProductContext } from '../context/ProductContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Cart = () => {
  // Use context directly — no duplicate local state
  const { cartItems, fallbackImage, removeFromCart, updateQuantity, clearCart } = useContext(ProductContext);

  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const navigate = useNavigate();

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  const handleCheckout = () => {
    clearCart();
    navigate('/sukses-order');
  };

  const onSuccess = (details, data) => {
    console.log('Payment succeeded:', details, data);
    handleCheckout();
  };

  const onCancel = (data) => console.log('Payment canceled:', data);
  const onError = (err) => console.error('Error during payment:', err);

  return (
    <PayPalScriptProvider options={{ 'client-id': 'AZW_HIbX9o5c4fcxKEmvFqRqF6YRoedmZXM3UGQT287B_jFilCiFn19r6BOmlE3X4m8czW1l8X3urvW9' }}>
      <div>
        <div className="cart">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Keranjang</Breadcrumb.Item>
          </Breadcrumb>

          <div className="container-cart">
            <div className="row">
              {/* Cart Items */}
              <div className="col-sm-6">
                <div className="cart-pembungkus">
                  <h1>Keranjang</h1>

                  {cartItems.length === 0 ? (
                    <div className="cart-empty">
                      <p>Keranjang kamu masih kosong.</p>
                      <Link to="/toko" className="btn btn-success mt-2">
                        Belanja Sekarang
                      </Link>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-details">
                          <div className="cart-item-image">
                            <img
                              src={item.image || fallbackImage}
                              alt={item.name}
                              className="product-image"
                            />
                          </div>
                          <div className="cart-item-info">
                            <h5 className="cart-item-title">{item.name}</h5>
                            <p className="cart-item-price">{formatPrice(item.price)}</p>
                          </div>
                        </div>

                        <div className="cart-item-actions">
                          <div className="counter">
                            <button
                              className="counter-btn counter-decrease"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity === 1}
                              aria-label="Kurangi jumlah"
                            >
                              −
                            </button>
                            <span className="counter-quantity">{item.quantity}</span>
                            <button
                              className="counter-btn counter-increase"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Tambah jumlah"
                            >
                              +
                            </button>
                          </div>
                          <Button
                            variant="outline-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Hapus
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-sm-6">
                <div className="cart-summary">
                  <h4>Total Order</h4>
                  {cartItems.length > 0 && (
                    <>
                      <p>
                        Total Harga:{' '}
                        <strong className="totalprice">
                          {formatPrice(getTotalPrice())}
                        </strong>
                      </p>
                      <div className="paypalbutton">
                        <PayPalButtons
                          style={{ layout: 'horizontal' }}
                          createOrder={(_data, actions) =>
                            actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: getTotalPrice().toFixed(2),
                                    currency_code: 'USD',
                                  },
                                },
                              ],
                            })
                          }
                          onApprove={(_data, actions) =>
                            actions.order
                              .capture()
                              .then((details) => onSuccess(details, _data))
                          }
                          onCancel={onCancel}
                          onError={onError}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Shipping Address Form */}
              <div className="col-sm-6">
                <div className="alamat">
                  <h4>Alamat Pembeli</h4>
                  <Form>
                    <Form.Group controlId="cart-name" className="nama">
                      <Form.Label>Nama</Form.Label>
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <Form.Control
                            type="text"
                            placeholder="Nama depan"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <Form.Control
                            type="text"
                            placeholder="Nama belakang"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>

                    <Form.Group controlId="cart-contact" className="kontak">
                      <Form.Label>Kontak</Form.Label>
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <Form.Control
                            type="tel"
                            placeholder="Nomor telepon"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>

                    <Form.Group controlId="cart-address" className="alamat-form">
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Masukkan alamat lengkap"
                      />
                    </Form.Group>

                    <Form.Group controlId="cart-city" className="kota">
                      <Form.Label>Kota dan Kode Pos</Form.Label>
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <Form.Control
                            type="text"
                            placeholder="Kota"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <Form.Control
                            type="text"
                            placeholder="Kode pos"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Cart;