const { ALLOCATION } = require('../utils/constants');

function calculateAllocation(totalAmount) {
  // Using default fallback if ALLOCATION is undefined
  const workerPct = ALLOCATION?.WORKER_SHARE || 0.90;
  const platformPct = ALLOCATION?.PLATFORM_SHARE || 0.08;
  const welfarePct = ALLOCATION?.WELFARE_CONTRIBUTION || 0.02;

  const workerShare = Math.round((totalAmount * workerPct) * 100) / 100;
  const platformShare = Math.round((totalAmount * platformPct) * 100) / 100;
  const welfareContribution = Math.round((totalAmount * welfarePct) * 100) / 100;

  return { workerShare, platformShare, welfareContribution };
}

module.exports = { calculateAllocation };
