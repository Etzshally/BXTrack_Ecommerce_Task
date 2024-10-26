const express = require('express');
const { body, validationResult } = require('express-validator');
const Payment = require('../models/Payment');

const router = express.Router();

router.post('/',
    [
        body('userId').isMongoId().withMessage('Invalid user ID'),
        body('totalAmount').isNumeric().withMessage('Total amount must be a number').isFloat({ gt: 0 }).withMessage('Total amount must be greater than zero'),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, totalAmount } = req.body;

        const paymentDetails = new Payment({
            userId,
            totalAmount,

            transactionId: `txn_${Date.now()}`,
        });
        try {
            await paymentDetails.save();
            res.status(201).json({
                message: 'Payment processed successfully!',
                paymentDetails,
            });
        } catch (error) {
            console.error('Error saving payment details:', error);
            res.status(500).json({ message: 'Failed to process payment.' });
        }
    }
);

module.exports = router;
