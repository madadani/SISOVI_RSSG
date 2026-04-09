import axiosInstance from '../../../core/api/axiosInstance';

export const dashboardService = {
  async getDashboardStats() {
    const response = await axiosInstance.get('/api/dashboard');
    return response.data;
  }
};
