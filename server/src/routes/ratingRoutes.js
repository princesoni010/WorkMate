const express = require('express');
const { createRating, getWorkerRatings } = require('../controllers/ratingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createRating);
router.get('/worker/:workerId', getWorkerRatings);

module.exports = router;
