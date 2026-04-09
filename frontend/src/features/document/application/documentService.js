import axiosInstance from '../../../core/api/axiosInstance';

export const documentService = {
  async getRegistrationStatus(queueNumber) {
    const response = await axiosInstance.get('/api/registration/status', {
      params: { queueNumber }
    });
    return response.data;
  },

  async uploadDocument(registrationId, type, file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('registrationId', registrationId);

    const response = await axiosInstance.post('/api/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};
