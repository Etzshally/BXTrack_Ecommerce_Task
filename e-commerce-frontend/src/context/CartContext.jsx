import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id == product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id == product._id
            ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter(item => item._id != productId)
    );
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id == productId);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id == productId
            ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
            : item
        );
      }
      return prevCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id == productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          return prevCart.map(item =>
            item._id == productId
              ? { ...existingProduct, quantity: existingProduct.quantity - 1 }
              : item
          );
        } else {
          return prevCart.filter(item => item._id != productId);
        }
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};