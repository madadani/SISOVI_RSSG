const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.100.9:8002';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  LOCATIONS: `${API_BASE_URL}/api/locations`,
  VACCINES: `${API_BASE_URL}/api/vaccines`,
  QUESTIONS: `${API_BASE_URL}/api/questions`,
  REGISTER: `${API_BASE_URL}/api/register`,
};

export const APP_CONFIG = {
  APP_NAME: 'SISOVI-RSSG',
  APP_DESCRIPTION: 'Sistem Informasi Skrining Online Vaksinasi Rumah Sakit Soeratno Gemolong',
  HOSPITAL_NAME: 'RS Soeratno Gemolong',
};
