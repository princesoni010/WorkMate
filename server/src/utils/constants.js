const SERVICE_CATEGORIES = ['electrician', 'plumber', 'carpenter', 'painter', 'domestic_helper', 'caregiver', 'driver', 'gardener', 'cleaner', 'technician'];
const BOOKING_STATUSES = ['requested', 'matched', 'accepted', 'on_the_way', 'in_progress', 'completed', 'rated', 'disputed', 'cancelled'];
const WORKER_STATUSES = ['draft', 'pending', 'verified', 'rejected', 'correction_required'];
const GRIEVANCE_TYPES = ['payment_dispute', 'unfair_rating', 'safety_issue', 'account_issue', 'service_quality'];

const ALLOCATION = { workerPercent: 0.90, platformPercent: 0.08, welfarePercent: 0.02 };

const MATCH_WEIGHTS = { skill: 0.35, distance: 0.25, availability: 0.20, rating: 0.10, fairness: 0.10 };
const MATCH_WEIGHTS_EMERGENCY = { skill: 0.35, distance: 0.35, availability: 0.20, fairness: 0.10 };

module.exports = {
  SERVICE_CATEGORIES,
  BOOKING_STATUSES,
  WORKER_STATUSES,
  GRIEVANCE_TYPES,
  ALLOCATION,
  MATCH_WEIGHTS,
  MATCH_WEIGHTS_EMERGENCY
};
