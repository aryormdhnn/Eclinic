import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fallbackImage =
    'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/03/06082237/kucing-domestik.jpg';

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex((item) => item.id === product.id);
      if (itemIndex !== -1) {
        // Item already in cart — create a new array with updated quantity (no mutation)
        return prevCartItems.map((item, idx) =>
          idx === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // New item — add with quantity 1
      return [...prevCartItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Persist total item count to localStorage whenever cart changes
  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem('totalItems', totalItems.toString());
  }, [cartItems]);

  return (
    <ProductContext.Provider
      value={{ fallbackImage, addToCart, removeFromCart, updateQuantity, clearCart, cartItems }}
    >
      {children}
    </ProductContext.Provider>
  );
};
