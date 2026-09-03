const express = require('express');
const { 
  createOrUpdateProfile, 
  getWorkers, 
  getWorkerById, 
  updateAvailability, 
  getMyJobs, 
  getMyEarnings 
} = require('../controllers/workerController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createOrUpdateProfile);
router.get('/', getWorkers);
router.get('/me/jobs', authenticate, getMyJobs);
router.get('/me/earnings', authenticate, getMyEarnings);
router.get('/:id', getWorkerById);
router.patch('/:id/availability', authenticate, updateAvailability);

module.exports = router;
