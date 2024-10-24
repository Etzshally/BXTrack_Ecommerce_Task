import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;
