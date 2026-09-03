import api from './api';

export const createBooking = (data) => api.post('/bookings', data);
export const getMyBookings = () => api.get('/bookings/my');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status, note) => api.put(`/bookings/${id}/status`, { status, note });

export default { createBooking, getMyBookings, getBookingById, updateBookingStatus };
