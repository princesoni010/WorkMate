const asyncHandler = require('../utils/asyncHandler');
const Worker = require('../models/Worker');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const WelfareLedger = require('../models/WelfareLedger');
const Rating = require('../models/Rating');
const Grievance = require('../models/Grievance');
const { getDemandForecast } = require('../services/forecastingService');
const { createAuditLog } = require('../services/auditService');

exports.getDashboard = asyncHandler(async (req, res) => {
  const [
    totalWorkers, verifiedWorkers, pendingWorkers,
    totalBookings, activeBookings, completedBookings,
    openGrievances,
    payments,
    welfare
  ] = await Promise.all([
    Worker.countDocuments(),
    Worker.countDocuments({ status: 'verified' }),
    Worker.countDocuments({ status: 'pending' }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: { $in: ['requested', 'matched', 'accepted', 'on_the_way', 'in_progress'] } }),
    Booking.countDocuments({ status: { $in: ['completed', 'rated'] } }),
    Grievance.countDocuments({ status: 'open' }),
    Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    WelfareLedger.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
  ]);
  
  const ratings = await Worker.aggregate([{ $group: { _id: null, avg: { $avg: '$ratingAverage' } } }]);

  res.json({
    success: true,
    data: {
      workers: { total: totalWorkers, verified: verifiedWorkers, pending: pendingWorkers },
      bookings: { total: totalBookings, active: activeBookings, completed: completedBookings },
      revenue: payments[0]?.total || 0,
      welfareContributions: welfare[0]?.total || 0,
      averageRating: ratings[0]?.avg || 0,
      openGrievances
    }
  });
});

exports.getPendingWorkers = asyncHandler(async (req, res) => {
  const workers = await Worker.find({ status: 'pending' }).populate('userId');
  res.json({ success: true, data: workers });
});

exports.verifyWorker = asyncHandler(async (req, res) => {
  const { action, note } = req.body;
  
  let status = 'pending';
  if (action === 'verify') status = 'verified';
  else if (action === 'reject') status = 'rejected';
  else if (action === 'correction_required') status = 'correction_required';
  
  const worker = await Worker.findByIdAndUpdate(req.params.id, { status }, { new: true });
  
  await createAuditLog({
    actorId: req.user._id,
    action: 'verify_worker',
    entityType: 'Worker',
    entityId: worker._id,
    reason: note || `Worker status set to ${status}`,
    metadata: { status }
  });
  
  res.json({ success: true, data: worker });
});

exports.getAdminBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate('customerId')
    .populate('workerId')
    .sort({ createdAt: -1 })
    .limit(50);
  res.json({ success: true, data: bookings });
});

exports.getWelfareLedger = asyncHandler(async (req, res) => {
  const entries = await WelfareLedger.find().populate('cooperativeId');
  res.json({ success: true, data: entries });
});

exports.getForecast = asyncHandler(async (req, res) => {
  const results = await getDemandForecast({});
  res.json({ success: true, data: results });
});

exports.getAdminGrievances = asyncHandler(async (req, res) => {
  const grievances = await Grievance.find().populate('raisedBy').sort({ createdAt: -1 });
  res.json({ success: true, data: grievances });
});
