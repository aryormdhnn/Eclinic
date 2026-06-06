import React, { createContext, useState } from 'react';

// Fix #8: Hapus duplikasi fetch dokter — data dokter sudah di-fetch
// langsung di komponen yang membutuhkannya (dokter.jsx, UserDetail.jsx, Order-Dokter.jsx).
// UserContext hanya perlu menyimpan state UI (pilihan konsultasi & jadwal).

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [rating, setRating] = useState(0);

  const updateInputValue = (value) => {
    setInputValue(value);
  };

  const handleScheduleChange = (value) => {
    setSelectedSchedule(value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <UserContext.Provider value={{
      inputValue,
      selectedSchedule,
      rating,
      setRating,
      handleRatingChange,
      handleScheduleChange,
      updateInputValue,
    }}>
      {children}
    </UserContext.Provider>
  );
};
