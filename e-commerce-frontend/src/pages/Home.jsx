import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome to Our E-Commerce Store</h1>


      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Categories</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {categories.map((category, index) => (
            <div key={index} className="min-w-[150px] hover:shadow-lg transition duration-300">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </section>


      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;