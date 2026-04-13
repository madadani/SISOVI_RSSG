import axiosInstance from '../../../core/api/axiosInstance';

export const adminService = {
  async getVaccines() {
    const response = await axiosInstance.get('/vaccines/admin');
    return response.data;
  },

  async getDashboardStats() {
    const response = await axiosInstance.get('/dashboard');
    return response.data;
  },

  async updateVaccine(id, data) {
    const response = await axiosInstance.put(`/vaccines/${id}`, data);
    return response.data;
  },

  async deleteVaccine(id) {
    const response = await axiosInstance.delete(`/vaccines/${id}`);
    return response.data;
  },

  async getPatients() {
    const response = await axiosInstance.get('/admin/patients');
    return response.data;
  },

  async getQueues() {
    const response = await axiosInstance.get('/admin/queues');
    return response.data;
  },

  async setQueueStatus(queueNumber, status) {
    const response = await axiosInstance.put(`/admin/queues/${queueNumber}/status`, { status });
    return response.data;
  },

  async getCertificates() {
    const response = await axiosInstance.get('/admin/certificates');
    return response.data;
  },

  async deletePatient(id) {
    const response = await axiosInstance.delete(`/admin/patients/${id}`);
    return response.data;
  }
};
