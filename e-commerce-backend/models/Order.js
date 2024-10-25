const mongoose = require('mongoose');
const OrderStatus = require('../helpers');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: { type: Array, required: true },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  createdAt: { type: Date, default: Date.now },
  totalAmount: { type: String, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
