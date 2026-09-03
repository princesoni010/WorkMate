const asyncHandler = require('../utils/asyncHandler');
const Rating = require('../models/Rating');
const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

exports.createRating = asyncHandler(async (req, res) => {
  const { bookingId, score, review } = req.body;
  
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  if (booking.customerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  
  const existing = await Rating.findOne({ bookingId });
  if (existing) return res.status(400).json({ success: false, message: 'Already rated' });
  
  const rating = await Rating.create({
    bookingId,
    workerId: booking.workerId,
    customerId: req.user._id,
    score,
    review
  });
  
  const worker = await Worker.findById(booking.workerId);
  if (worker) {
    const totalScore = (worker.ratingAverage * worker.ratingCount) + score;
    worker.ratingCount += 1;
    worker.ratingAverage = totalScore / worker.ratingCount;
    await worker.save();
  }
  
  booking.status = 'rated';
  await booking.save();
  
  res.status(201).json({ success: true, data: rating });
});

exports.getWorkerRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find({ 
    workerId: req.params.workerId,
    moderationStatus: 'active'
  }).populate('customerId', 'name');
  
  res.json({ success: true, data: ratings });
});
