import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const updatedItem = {
      ...product,
      image: product.image, // Ensure the image property is correctly added
    };
    setCartItems((prevItems) => [...prevItems, updatedItem]);
    localStorage.setItem('cart', JSON.stringify([...cartItems, updatedItem])); // Save to localStorage
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
