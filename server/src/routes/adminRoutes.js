const express = require('express');
const { 
  getDashboard, 
  getPendingWorkers, 
  verifyWorker, 
  getAdminBookings, 
  getWelfareLedger, 
  getForecast, 
  getAdminGrievances 
} = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authenticate);
router.use(allowRoles('society_admin', 'federation_admin'));

router.get('/dashboard', getDashboard);
router.get('/workers/pending', getPendingWorkers);
router.patch('/workers/:id/verify', verifyWorker);
router.get('/bookings', getAdminBookings);
router.get('/welfare-ledger', getWelfareLedger);
router.get('/forecast', getForecast);
router.get('/grievances', getAdminGrievances);

module.exports = router;
