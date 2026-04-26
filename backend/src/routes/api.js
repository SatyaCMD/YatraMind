const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to YatraMind Core API' });
});

router.use('/auth', require('./authRoutes'));
router.use('/ai', require('./aiRoutes'));
router.use('/bookings', require('./bookingRoutes'));
router.use('/payments', require('./paymentRoutes'));

module.exports = router;
