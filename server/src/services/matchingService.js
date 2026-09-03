const Worker = require('../models/Worker');
const { haversineDistance } = require('../utils/distance');
const { MATCH_WEIGHTS, MATCH_WEIGHTS_EMERGENCY } = require('../utils/constants');

async function findMatchingWorkers(booking, limit = 5) {
  const workers = await Worker.find({
    status: 'verified',
    'skills.name': booking.serviceType,
    'availability.isAvailableNow': true
  });

  const weights = booking.isEmergency ? MATCH_WEIGHTS_EMERGENCY : MATCH_WEIGHTS;
  
  const results = workers.map(worker => {
    let skillScore = 0;
    let distanceScore = 0;
    let availabilityScore = 0;
    let ratingScore = 0;
    let fairnessScore = 0;
    const reasons = [];

    // Skill
    const skill = worker.skills.find(s => s.name === booking.serviceType);
    if (skill) {
      skillScore = 100;
      if (skill.experienceYears > 5) {
        skillScore += 20; // bonus
      }
      reasons.push(`Exact skill match: ${skill.name}`);
    }

    // Distance
    if (booking.location && booking.location.coordinates && worker.serviceArea && worker.serviceArea.center) {
      const distance = haversineDistance(
        booking.location.coordinates.lat, booking.location.coordinates.lng,
        worker.serviceArea.center.lat, worker.serviceArea.center.lng
      );
      const radius = worker.serviceArea.radiusKm || 10;
      distanceScore = 100 * Math.max(0, 1 - distance / radius);
      reasons.push(`${distance.toFixed(1)} km from customer location`);
    }

    // Availability
    if (worker.availability.isAvailableNow) {
      availabilityScore = 100;
      reasons.push('Available in requested time slot');
    }

    // Rating
    ratingScore = (worker.ratingAverage / 5) * 100;
    if (worker.ratingCount > 0) {
      reasons.push(`${worker.ratingAverage.toFixed(1)} rating from ${worker.ratingCount} reviews`);
    }

    // Fairness
    const jobsThisWeek = worker.jobsAssignedThisWeek || 0;
    fairnessScore = 100 * Math.max(0, 1 - jobsThisWeek / 20);
    reasons.push(`Fair allocation: fewer jobs assigned this week`);

    // We don't have exact weights in constants available, using defaults
    const wSkill = weights?.skill || 0.3;
    const wDistance = weights?.distance || 0.2;
    const wAvailability = weights?.availability || 0.2;
    const wRating = weights?.rating || 0.15;
    const wFairness = weights?.fairness || 0.15;

    const totalScore = (skillScore * wSkill) + (distanceScore * wDistance) + 
                       (availabilityScore * wAvailability) + (ratingScore * wRating) + 
                       (fairnessScore * wFairness);

    return {
      worker,
      score: totalScore,
      reasons
    };
  });

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

module.exports = {
  findMatchingWorkers
};
