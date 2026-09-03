const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  rerunMatching,
  manualAssign
} = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/my', authenticate, getMyBookings);
router.get('/:id', authenticate, getBookingById);
router.patch('/:id/status', authenticate, updateBookingStatus);
router.post('/:id/match', authenticate, allowRoles('society_admin', 'federation_admin'), rerunMatching);
router.patch('/:id/assign', authenticate, allowRoles('society_admin', 'federation_admin'), manualAssign);

module.exports = router;
