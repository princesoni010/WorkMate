import React, { useState, useEffect } from 'react';
import { Card, Button, StatusBadge } from '../../components/common';
import WorkerNavigationMap from '../../components/worker/WorkerNavigationMap';
import useAuth from '../../hooks/useAuth';
import { getMyJobs, updateBookingStatus } from '../../services/workerService';

const Jobs = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedJob, setSelectedJob] = useState(null);
  const [navigationJob, setNavigationJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyJobs()
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          const formatted = data.map((j) => ({
            id: j.bookingCode || j._id,
            rawId: j._id,
            customer: j.customerId?.name || 'Customer',
            customerPhone: j.customerId?.phone || '9876543210',
            service: j.serviceType ? j.serviceType.charAt(0).toUpperCase() + j.serviceType.slice(1) : 'Service',
            location: j.location?.address || 'Ranchi, Jharkhand',
            date: j.scheduledAt ? new Date(j.scheduledAt).toISOString().split('T')[0] : 'Today',
            time: j.scheduledAt ? new Date(j.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM',
            status: j.status || 'accepted',
            earnings: Math.round((j.pricing?.totalAmount || 600) * 0.90),
            distance: '2.3 km',
            lat: j.location?.latitude || 23.3641,
            lng: j.location?.longitude || 85.3296
          }));
          setJobs(formatted);
        }
      })
      .catch((err) => {
        console.warn('Jobs fetch error:', err);
        // Only if demo worker specifically, show demo fallback
        if (user?.email === 'worker.demo@workmate.test') {
          setJobs([
            { 
              id: 'WM-849201', 
              rawId: '1',
              customer: 'Priya Sharma', 
              customerPhone: '9876543210', 
              service: 'Electrician - Fan & Switchboard Wiring', 
              location: 'Flat 402, Shanti Kunj, Kanke Road, Ranchi', 
              date: '2026-09-03', 
              time: '14:00', 
              status: 'on_the_way', 
              earnings: 540, 
              distance: '2.3 km',
              lat: 23.3641,
              lng: 85.3296
            }
          ]);
        } else {
          setJobs([]);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return ['requested', 'matched', 'pending'].includes(job.status);
    if (activeTab === 'Active') return ['accepted', 'on_the_way', 'in_progress'].includes(job.status);
    return job.status === activeTab.toLowerCase();
  });

  const handleStatusUpdate = async (id, newStatus) => {
    const jobItem = jobs.find(j => j.id === id);
    if (jobItem?.rawId) {
      try {
        await updateBookingStatus(jobItem.rawId, newStatus, `Worker updated status to ${newStatus}`);
      } catch (err) {
        console.warn('Status update API error:', err);
      }
    }

    setJobs(jobs.map((j) => (j.id === id ? { ...j, status: newStatus } : j)));
    if (navigationJob && navigationJob.id === id) {
      setNavigationJob({ ...navigationJob, status: newStatus });
    }
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob({ ...selectedJob, status: newStatus });
    }
  };

  const handleAccept = (e, job) => {
    e.stopPropagation();
    handleStatusUpdate(job.id, 'accepted');
    setNavigationJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDecline = (e, job) => {
    e.stopPropagation();
    handleStatusUpdate(job.id, 'cancelled');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Assigned Jobs</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage work orders, live GPS route navigation & earnings</p>
        </div>
        <div className="bg-green-50 text-green-800 border border-green-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Online & Ready for Jobs</span>
        </div>
      </div>

      {/* Live GPS Navigation View if active job is opened */}
      {navigationJob && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
              Live GPS Route & Navigation ({navigationJob.id})
            </h2>
            <button
              onClick={() => setNavigationJob(null)}
              className="text-xs font-bold text-gray-500 hover:text-gray-800 underline"
            >
              Minimize Navigation
            </button>
          </div>
          <WorkerNavigationMap
            job={navigationJob}
            onStatusChange={handleStatusUpdate}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 bg-white rounded-xl p-1.5 shadow-sm border border-gray-200">
        {['Active', 'Pending', 'Completed', 'All'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 min-w-[80px] py-2 text-xs font-bold rounded-lg transition relative ${
              activeTab === tab 
                ? 'bg-[#138808] text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === 'Pending' && jobs.filter((j) => ['requested', 'matched', 'pending'].includes(j.status)).length > 0 && (
              <span className="ml-1.5 bg-red-500 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                {jobs.filter((j) => ['requested', 'matched', 'pending'].includes(j.status)).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500 text-sm">Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <Card className="text-center py-12 border-dashed border-2 border-gray-200 bg-white rounded-2xl">
            <div className="text-4xl mb-2">🛵</div>
            <h3 className="text-base font-bold text-gray-700 mb-1">No {activeTab} Jobs</h3>
            <p className="text-xs text-gray-400">
              {activeTab === 'Active'
                ? 'You do not have any active jobs right now. Stay online to receive incoming requests in your service radius.'
                : `No ${activeTab.toLowerCase()} jobs found in your history.`}
            </p>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="p-5 hover:shadow-md transition border border-gray-200 cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-900 text-base">{job.service}</h3>
                    <span className="text-xs text-gray-400 font-mono">#{job.id}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">Customer: <span className="font-semibold text-gray-800">{job.customer}</span></p>
                </div>
                <StatusBadge status={job.status} type="booking" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-600 mb-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <div>📍 <span className="font-medium">{job.location}</span></div>
                <div>🕒 <span className="font-medium">{job.time} ({job.date})</span></div>
                <div className="col-span-2 sm:col-span-1">
                  🛵 Distance: <span className="font-bold text-blue-700">{job.distance}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
                <div className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-lg">
                  💰 You Earn: ₹{job.earnings} (90% Fair Share)
                </div>

                <div className="flex items-center space-x-2">
                  {['requested', 'matched', 'pending'].includes(job.status) ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleDecline(e, job)}
                        className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleAccept(e, job)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm"
                      >
                        Accept & Navigate
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNavigationJob(job);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center space-x-1"
                    >
                      <span>🗺️</span>
                      <span>Open GPS Navigation</span>
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
