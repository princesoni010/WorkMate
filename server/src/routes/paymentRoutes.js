const express = require('express');
const { createOrder, verifyPayment, getPaymentByBooking } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-order', authenticate, createOrder);
router.post('/verify', authenticate, verifyPayment);
router.get('/booking/:bookingId', authenticate, getPaymentByBooking);

module.exports = router;
