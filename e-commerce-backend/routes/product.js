const express = require('express');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, rating, description } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const product = new Product({
      name,
      price,
      category,
      rating,
      description,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

router.get('/', async (req, res) => {
  const { category, rating, minPrice, maxPrice } = req.query;
  const query = {};

  if (category) {
    query.category = category;
  }

  if (rating) {
    query.rating = { $gte: Number(rating) };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
