const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  '/',
  [
    body('name')
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ min: 3 })
      .withMessage('Category name must be at least 3 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = new Category({
      name: req.body.name,
    });

    try {
      const newCategory = await category.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.put(
  '/:id',
  [
    body('name')
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ min: 3 })
      .withMessage('Category name must be at least 3 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
