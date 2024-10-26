const express = require('express');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

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

router.post(
  '/',
  upload.single('image'),
  [
    body('name')
      .notEmpty()
      .withMessage('Product name is required'),
    body('price')
      .isNumeric()
      .withMessage('Price must be a number')
      .notEmpty()
      .withMessage('Price is required'),
    body('category')
      .notEmpty()
      .withMessage('Category is required'),
    body('rating')
      .isNumeric()
      .withMessage('Rating must be a number')
      .isInt({ min: 0, max: 5 })
      .withMessage('Rating must be between 0 and 5'),
    body('description')
      .notEmpty()
      .withMessage('Description is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

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

router.put(
  '/:id',
  [
    body('name')
      .optional()
      .notEmpty()
      .withMessage('Product name cannot be empty'),
    body('price')
      .optional()
      .isNumeric()
      .withMessage('Price must be a number'),
    body('category')
      .optional()
      .notEmpty()
      .withMessage('Category cannot be empty'),
    body('rating')
      .optional()
      .isNumeric()
      .withMessage('Rating must be a number')
      .isInt({ min: 0, max: 5 })
      .withMessage('Rating must be between 0 and 5'),
    body('description')
      .optional()
      .notEmpty()
      .withMessage('Description cannot be empty'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;