const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    status: { type: String, default: "success" }, 
    transactionId: { type: String, default: `txn_${Date.now()}` },
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);