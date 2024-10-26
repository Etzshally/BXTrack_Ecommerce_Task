import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ProductCard from '../components/ProductCard';
import { Select, MenuItem, InputLabel, FormControl, Button, TextField, Box } from '@mui/material';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);

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
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (minPrice || maxPrice) {
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
      }
      if (minRating) params.rating = minRating;

      const response = await axiosInstance.get('/api/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleFilterChange = () => {
    fetchProducts();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome to Our E-Commerce Store</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filters</h2>

        <Box
          className="bg-white rounded-lg p-6 shadow-md"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
              variant="outlined"
              sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" flexDirection="column" width="100%">
            <Box display="flex" gap={2}>
              <TextField
                label="Min Price"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
              />
              <TextField
                label="Max Price"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
              />
            </Box>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Min Rating</InputLabel>
            <Select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              label="Min Rating"
              variant="outlined"
              sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            >
              <MenuItem value={0}>All</MenuItem>
              {[1, 2, 3, 4, 5].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}+
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterChange}
            sx={{ minWidth: '150px', fontWeight: 'bold', mt: { xs: 2, md: 0 } }}
          >
            Apply Filters
          </Button>
        </Box>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
          {products.length === 0 && (
            <p>No products found based on filters..</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;