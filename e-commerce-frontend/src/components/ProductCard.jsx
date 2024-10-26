import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const { user } = useAuth()

  useEffect(() => {
    const productInCart = cart.find(item => item._id === product._id);
    setIsInCart(!!productInCart);
  }, [cart, product._id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };

  const [signinModalOpen, setSigninModalOpen] = useState(false);

  const openSigninModal = () => {
    setSigninModalOpen(true);
  };

  const closeSigninModal = () => {
    setSigninModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg w-full shadow-md p-4">
        <Link to={`/products/${product._id}`}>
          <img src={`${import.meta.env.VITE_APP_BACKEND_URL}${product.imageUrl}`} alt={product.name} className="h-40 w-full object-cover mb-2" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-700">${product.price.toFixed(2)}</p>
        </Link>

        {isInCart ? (
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={user && user.role == "user" ? handleAddToCart : openSigninModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Add to Cart
          </button>
        )}
      </div>

      <AuthModal signinModalOpen={signinModalOpen} closeSigninModal={closeSigninModal} />
    </>
  );
};

export default ProductCard;