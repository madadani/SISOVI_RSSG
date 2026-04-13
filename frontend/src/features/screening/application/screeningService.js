import axiosInstance from '../../../core/api/axiosInstance';

export const screeningService = {
  async getQuestions() {
    const response = await axiosInstance.get('/questions');
    return response.data;
  },

  async getVaccines() {
    const response = await axiosInstance.get('/vaccines');
    return response.data;
  },

  async getLocations() {
    const response = await axiosInstance.get('/locations');
    return response.data;
  },

  async submitRegistration(data) {
    const response = await axiosInstance.post('/register', data);
    return response.data;
  },
};
