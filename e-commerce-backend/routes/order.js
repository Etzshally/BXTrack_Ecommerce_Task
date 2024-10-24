const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId'); // Assuming you want to populate userId with user details
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const order = new Order({
    userId: req.body.userId,
    products: req.body.products,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Update an order status
// router.put('/:id', async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete an order
// router.delete('/:id', async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Order deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
