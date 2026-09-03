import api from './api';

export const createRating = (data) => api.post('/ratings', data);
export const getWorkerRatings = (workerId) => api.get(`/ratings/worker/${workerId}`);

export default { createRating, getWorkerRatings };
