const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Create a product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Get all products
router.get('/', async (req, res) => {
  const { category } = req.query; // Get category from query
  const query = category ? { category } : {};
  const products = await Product.find(query);
  res.json(products);
});

// Update a product
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Delete a product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
