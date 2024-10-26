import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate()
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCheckout = async () => {
    const orderData = {
      userId: user.id,
      products: cart,
      totalAmount: totalPrice,
    };

    try {
      await axiosInstance.post('/api/payments', {
        userId: user.id,
        totalAmount: totalPrice,
      });
      await axiosInstance.post('/api/orders', orderData);
      clearCart();
      setSnackbarMessage('Order created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/user")
      }, 2000);
    } catch (error) {
      console.error('Error creating order:', error);
      setSnackbarMessage('Failed to create order. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item._id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={`${import.meta.env.VITE_APP_BACKEND_URL}${item.imageUrl}`} alt={item.name} className="h-20 w-20 object-cover mb-2" />
                  <div className='ml-5'>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-gray-500 text-white px-2 py-1 rounded-md ml-4"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-4"
            >
              Clear Cart
            </button>
            {cart.length > 0 && (<button
              onClick={handleCheckout}
              className="bg-green-600 ml-2 text-white px-4 py-2 rounded-md mt-4"
            >
              Checkout
            </button>)}
          </div>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Cart;