import api from './api';

export const getDashboard = () => api.get('/admin/dashboard');
export const getPendingWorkers = () => api.get('/admin/workers/pending');
export const verifyWorker = (id, action, note) => api.put(`/admin/workers/${id}/verify`, { action, note });
export const getAdminBookings = (filters) => api.get('/admin/bookings', { params: filters });
export const getWelfareLedger = () => api.get('/admin/welfare-ledger');
export const getForecast = () => api.get('/admin/forecast');
export const getAdminGrievances = (filters) => api.get('/admin/grievances', { params: filters });

export default { getDashboard, getPendingWorkers, verifyWorker, getAdminBookings, getWelfareLedger, getForecast, getAdminGrievances };
