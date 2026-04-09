import axiosInstance from '../../../core/api/axiosInstance';

export const certificateService = {
  async searchCertificates(nik, dob) {
    const response = await axiosInstance.get('/api/certificates', {
      params: { nik, dob },
    });
    return response.data;
  },

  async downloadCertificate(certificateId) {
    const response = await axiosInstance.get(`/api/certificates/${certificateId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
