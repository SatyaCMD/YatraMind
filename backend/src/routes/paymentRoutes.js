const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Process new payment
router.post('/', async (req, res) => {
    try {
        // Validate / simulate payment charge here
        const newPayment = new Payment({
            ...req.body,
            paymentStatus: 'SUCCESS', // Hardcoded mock success
            transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase()
        });
        
        const savedPayment = await newPayment.save();
        
        // Update booking status to CONFIRMED
        if (req.body.bookingId) {
            await Booking.findByIdAndUpdate(req.body.bookingId, { status: 'CONFIRMED' });
        }
        
        res.status(201).json({ success: true, data: savedPayment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
