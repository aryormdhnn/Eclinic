import React, { createContext, useState } from 'react';

// Fix #8: Hapus duplikasi fetch dokter dari OrderContext.
// OrderContext hanya perlu menyimpan data hasil order (harga & metode bayar)
// agar bisa diakses oleh halaman SuksesDokter.

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [price, setPrice] = useState('');
  const [selectedPay, setSelectedPay] = useState('');

  const updatePrice = (value) => {
    setPrice(value);
  };

  const updateSelectedPay = (value) => {
    setSelectedPay(value);
  };

  return (
    <OrderContext.Provider value={{ price, selectedPay, updatePrice, updateSelectedPay, setPrice, setSelectedPay }}>
      {children}
    </OrderContext.Provider>
  );
};
