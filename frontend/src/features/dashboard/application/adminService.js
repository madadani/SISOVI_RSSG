import axiosInstance from '../../../core/api/axiosInstance';

export const adminService = {
  async getVaccines() {
    const response = await axiosInstance.get('/api/vaccines');
    return response.data;
  },
  
  async getDashboardStats() {
    const response = await axiosInstance.get('/api/dashboard');
    return response.data;
  },

  async updateVaccine(id, data) {
    const response = await axiosInstance.put(`/api/vaccines/${id}`, data);
    return response.data;
  },

  async getPatients() {
    const response = await axiosInstance.get('/api/admin/patients');
    return response.data;
  },

  async getQueues() {
    const response = await axiosInstance.get('/api/admin/queues');
    return response.data;
  },

  async setQueueStatus(queueNumber, status) {
    const response = await axiosInstance.put(`/api/admin/queues/${queueNumber}/status`, { status });
    return response.data;
  },

  async getCertificates() {
    const response = await axiosInstance.get('/api/admin/certificates');
    return response.data;
  }
};
