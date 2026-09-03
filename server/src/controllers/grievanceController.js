const asyncHandler = require('../utils/asyncHandler');
const Grievance = require('../models/Grievance');
const { createAuditLog } = require('../services/auditService');

exports.createGrievance = asyncHandler(async (req, res) => {
  const { type, description, bookingId, evidenceUrls } = req.body;
  
  const grievance = await Grievance.create({
    raisedBy: req.user._id,
    type,
    description,
    bookingId,
    evidenceUrls,
    status: 'open'
  });
  
  res.status(201).json({ success: true, data: grievance });
});

exports.getMyGrievances = asyncHandler(async (req, res) => {
  const grievances = await Grievance.find({ raisedBy: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: grievances });
});

exports.updateGrievance = asyncHandler(async (req, res) => {
  const { status, resolutionNote } = req.body;
  
  const grievance = await Grievance.findByIdAndUpdate(
    req.params.id, 
    { status, resolutionNote, assignedAdmin: req.user._id },
    { new: true }
  );
  
  if (!grievance) return res.status(404).json({ success: false, message: 'Not found' });
  
  await createAuditLog({
    actorId: req.user._id,
    action: 'update_grievance',
    entityType: 'Grievance',
    entityId: grievance._id,
    reason: `Grievance status updated to ${status}`,
    metadata: { status }
  });
  
  res.json({ success: true, data: grievance });
});
