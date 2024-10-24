import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Fashion', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Home & Kitchen', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Books', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Sports', image: 'https://via.placeholder.com/150' },
];

const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Product 5', price: 24.99, image: 'https://via.placeholder.com/150' },
];

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Our E-Commerce Store</h1>

      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {categories.map(category => (
          <Link key={category.id} to={`/categories/${category.name.toLowerCase()}`} className="flex-none w-32 h-32 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center">
            <img src={category.image} alt={category.name} className="h-16 w-16 mb-2" />
            <span className="text-center font-medium">{category.name}</span>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
