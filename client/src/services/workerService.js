import api from './api';
import { updateBookingStatus } from './bookingService';

export const createOrUpdateProfile = (data) => api.post('/workers', data);
export const getWorkers = (filters) => api.get('/workers', { params: filters });
export const getWorkerById = (id) => api.get(`/workers/${id}`);
export const updateAvailability = (id, data) => api.patch(`/workers/${id}/availability`, data);
export const getMyJobs = () => api.get('/workers/me/jobs');
export const getMyEarnings = () => api.get('/workers/me/earnings');
export { updateBookingStatus };

export default { createOrUpdateProfile, getWorkers, getWorkerById, updateAvailability, getMyJobs, getMyEarnings, updateBookingStatus };
