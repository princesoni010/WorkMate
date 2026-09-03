const Booking = require('../models/Booking');

async function getDemandForecast(filters) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Group completed/requested bookings by serviceType and location.locality
  const aggregation = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo },
        status: { $in: ['completed', 'requested'] }
      }
    },
    {
      $group: {
        _id: {
          serviceType: '$serviceType',
          locality: '$location.locality'
        },
        count: { $sum: 1 }
      }
    }
  ]);

  const results = aggregation.map(item => {
    // simple averaging: count bookings per service per locality over recent 30 days
    const average_per_day = item.count / 30;
    const predicted = Math.ceil(average_per_day * 7); // weekly forecast
    
    let recommendation = 'Monitor demand';
    if (predicted > 5) {
      recommendation = `Keep ${predicted} additional workers on call`;
    }

    return {
      locality: item._id.locality || 'Unknown',
      serviceType: item._id.serviceType,
      expectedBookings: predicted,
      recommendation
    };
  });

  return results;
}

module.exports = {
  getDemandForecast
};
