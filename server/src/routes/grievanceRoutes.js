const express = require('express');
const { createGrievance, getMyGrievances, updateGrievance } = require('../controllers/grievanceController');
const { authenticate } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, createGrievance);
router.get('/my', authenticate, getMyGrievances);
router.patch('/:id', authenticate, allowRoles('society_admin', 'federation_admin'), updateGrievance);

module.exports = router;
