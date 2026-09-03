import api from './api';

export const createOrder = (bookingId) => api.post(`/payments/order/${bookingId}`);
export const verifyPayment = (data) => api.post('/payments/verify', data);
export const getPaymentByBooking = (bookingId) => api.get(`/payments/booking/${bookingId}`);

export default { createOrder, verifyPayment, getPaymentByBooking };
