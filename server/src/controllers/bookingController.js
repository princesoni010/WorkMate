const asyncHandler = require('../utils/asyncHandler');
const Booking = require('../models/Booking');
const Worker = require('../models/Worker');
const { findMatchingWorkers } = require('../services/matchingService');
const { createAuditLog } = require('../services/auditService');

exports.createBooking = asyncHandler(async (req, res) => {
  const { serviceType, description, scheduledAt, location, isEmergency, jobImageUrls } = req.body;
  
  let basePrice = 500;
  if (serviceType === 'plumber') basePrice = 450;
  else if (serviceType === 'electrician') basePrice = 500;
  else if (serviceType === 'carpenter') basePrice = 600;
  
  let estimatedPrice = basePrice + 100; // travel charge
  if (isEmergency) estimatedPrice += 200;
  
  const booking = await Booking.create({
    customerId: req.user._id,
    serviceType,
    description,
    scheduledAt,
    location,
    isEmergency,
    jobImageUrls,
    status: 'requested',
    pricing: {
      estimatedAmount: estimatedPrice
    },
    timeline: [{ status: 'requested', timestamp: new Date() }]
  });
  
  const matches = await findMatchingWorkers(booking);
  
  if (matches.length > 0) {
    const topMatch = matches[0];
    booking.status = 'matched';
    booking.workerId = topMatch.worker._id;
    booking.matchExplanation = topMatch.reasons;
    booking.timeline.push({ status: 'matched', timestamp: new Date() });
    await booking.save();
  }
  
  res.status(201).json({ success: true, data: booking });
});

exports.getMyBookings = asyncHandler(async (req, res) => {
  const query = {};
  if (req.user.role === 'worker') {
    const worker = await Worker.findOne({ userId: req.user._id });
    query.workerId = worker?._id;
  } else {
    query.customerId = req.user._id;
  }
  
  const bookings = await Booking.find(query)
    .populate('workerId')
    .populate('customerId', 'name phone')
    .sort({ createdAt: -1 });
    
  res.json({ success: true, data: bookings });
});

exports.getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('workerId')
    .populate('customerId', 'name phone');
    
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  
  // Checking permissions is simplified here
  res.json({ success: true, data: booking });
});

exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Not found' });
  
  booking.status = status;
  booking.timeline.push({ status, timestamp: new Date() });
  
  if (status === 'completed' && booking.workerId) {
    await Worker.findByIdAndUpdate(booking.workerId, { $inc: { completedJobs: 1 } });
  }
  
  await booking.save();
  
  await createAuditLog({
    actorId: req.user._id,
    action: 'update_booking_status',
    entityType: 'Booking',
    entityId: booking._id,
    reason: `Status changed to ${status}`,
    metadata: { status }
  });
  
  res.json({ success: true, data: booking });
});

exports.rerunMatching = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  const matches = await findMatchingWorkers(booking);
  res.json({ success: true, data: matches });
});

exports.manualAssign = asyncHandler(async (req, res) => {
  const { workerId, reason } = req.body;
  if (!reason) return res.status(400).json({ success: false, message: 'Reason is mandatory' });
  
  const booking = await Booking.findById(req.params.id);
  booking.workerId = workerId;
  booking.status = 'matched';
  booking.timeline.push({ status: 'matched', timestamp: new Date() });
  await booking.save();
  
  await createAuditLog({
    actorId: req.user._id,
    action: 'manual_assign',
    entityType: 'Booking',
    entityId: booking._id,
    reason,
    metadata: { workerId }
  });
  
  res.json({ success: true, data: booking });
});
