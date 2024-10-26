const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Order = require('../models/Order');
const auth = require("../middleware/auth");

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user/:userId', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  '/',
  [
    body('userId')
      .notEmpty()
      .withMessage('User ID is required'),
    body('products')
      .isArray({ min: 1 })
      .withMessage('Products must be an array with at least one item'),
    body('totalAmount')
      .isNumeric()
      .withMessage('Total amount must be a number')
      .notEmpty()
      .withMessage('Total amount is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const order = new Order({
      userId: req.body.userId,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
    });

    try {
      const newOrder = await order.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.put(
  '/:id/status',
  [
    body('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['pending', 'approved', 'declined'])
      .withMessage('Invalid status value'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;

    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      order.status = status;
      await order.save();

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;