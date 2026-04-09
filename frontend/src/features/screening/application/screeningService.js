import axiosInstance from '../../../core/api/axiosInstance';

export const screeningService = {
  async getQuestions() {
    const response = await axiosInstance.get('/api/questions');
    return response.data;
  },

  async getVaccines() {
    const response = await axiosInstance.get('/api/vaccines');
    return response.data;
  },

  async getLocations() {
    const response = await axiosInstance.get('/api/locations');
    return response.data;
  },

  async submitRegistration(data) {
    const response = await axiosInstance.post('/api/register', data);
    return response.data;
  },
};
