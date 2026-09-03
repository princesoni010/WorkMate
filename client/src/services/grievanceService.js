import api from './api';

export const createGrievance = (data) => api.post('/grievances', data);
export const getMyGrievances = () => api.get('/grievances/my');

export default { createGrievance, getMyGrievances };
