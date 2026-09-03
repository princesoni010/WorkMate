const asyncHandler = require('../utils/asyncHandler');
const Worker = require('../models/Worker');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const WelfareLedger = require('../models/WelfareLedger');
const { haversineDistance } = require('../utils/distance');

exports.createOrUpdateProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ success: false, message: 'Not authorized as worker' });
  }

  let worker = await Worker.findOne({ userId: req.user._id });
  if (worker) {
    worker = await Worker.findOneAndUpdate({ userId: req.user._id }, req.body, { new: true });
  } else {
    worker = await Worker.create({
      userId: req.user._id,
      ...req.body,
      status: 'pending'
    });
  }

  res.json({ success: true, data: worker });
});

exports.getWorkers = asyncHandler(async (req, res) => {
  const { skill, district, available, minRating, lat, lng, radius } = req.query;
  
  const query = { status: 'verified' };
  
  if (skill) query['skills.name'] = skill;
  if (district) query['address.district'] = district;
  if (available === 'true') query['availability.isAvailableNow'] = true;
  if (minRating) query.ratingAverage = { $gte: Number(minRating) };

  let workers = await Worker.find(query).populate('userId', 'name phone').sort({ ratingAverage: -1 });

  if (lat && lng) {
    const searchRadius = radius ? Number(radius) : 10;
    workers = workers.filter(w => {
      if (!w.serviceArea || !w.serviceArea.center) return false;
      const dist = haversineDistance(
        Number(lat), Number(lng),
        w.serviceArea.center.lat, w.serviceArea.center.lng
      );
      return dist <= searchRadius;
    });
  }

  res.json({ success: true, data: workers });
});

exports.getWorkerById = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id).populate('userId', 'name phone');
  if (!worker) return res.status(404).json({ success: false, message: 'Worker not found' });
  
  const workerObj = worker.toObject();
  const isOwner = req.user && req.user._id.toString() === worker.userId._id.toString();
  const isAdmin = req.user && ['society_admin', 'federation_admin'].includes(req.user.role);
  
  if (!isOwner && !isAdmin) {
    delete workerObj.documentUrls;
  }
  
  res.json({ success: true, data: workerObj });
});

exports.updateAvailability = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({ userId: req.user._id });
  if (!worker) return res.status(404).json({ success: false, message: 'Worker profile not found' });
  
  worker.availability = { ...worker.availability, ...req.body };
  await worker.save();
  
  res.json({ success: true, data: worker });
});

exports.getMyJobs = asyncHandler(async (req, res) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  
  const worker = await Worker.findOne({ userId: req.user._id });
  if (!worker) return res.status(404).json({ success: false, message: 'Profile not found' });
  
  const jobs = await Booking.find({ workerId: worker._id })
    .populate('customerId', 'name')
    .sort({ scheduledAt: -1 });
    
  res.json({ success: true, data: jobs });
});

exports.getMyEarnings = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({ userId: req.user._id });
  if (!worker) return res.status(404).json({ success: false, message: 'Profile not found' });
  
  const bookings = await Booking.find({ workerId: worker._id });
  const bookingIds = bookings.map(b => b._id);
  
  const payments = await Payment.find({ bookingId: { $in: bookingIds }, status: 'paid' });
  
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - now.getDay());
  const todayStart = new Date(now.setHours(0,0,0,0));
  
  let totalEarnings = 0;
  let thisMonth = 0;
  let thisWeek = 0;
  let today = 0;
  
  payments.forEach(p => {
    const amt = p.allocation?.workerShare || 0;
    totalEarnings += amt;
    if (p.paidAt >= thisMonthStart) thisMonth += amt;
    if (p.paidAt >= thisWeekStart) thisWeek += amt;
    if (p.paidAt >= todayStart) today += amt;
  });
  
  const welfareEntries = await WelfareLedger.find({ workerId: worker._id });
  const welfareBalance = welfareEntries.reduce((sum, e) => sum + e.amount, 0);
  
  res.json({
    success: true,
    data: {
      totalEarnings,
      thisMonth,
      thisWeek,
      today,
      welfareBalance,
      recentPayments: payments.slice(-5)
    }
  });
});
