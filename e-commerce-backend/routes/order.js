const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require("../middleware/auth")

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

router.post('/', async (req, res) => {
  const order = new Order({
    userId: req.body.userId,
    products: req.body.products,
    totalAmount: req.body.totalAmount
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id/status', async (req, res) => {
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
});

module.exports = router;
