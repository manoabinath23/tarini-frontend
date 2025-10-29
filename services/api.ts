import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Your computer's IP address from ipconfig: 172.20.10.11
const API_URL = Platform.select({
  ios: 'https://tarini-backend.onrender.com/api',
  android: 'https://tarini-backend.onrender.com/api',
  default: 'https://tarini-backend.onrender.com/api',
});

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increased to 30 seconds
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received from:', response.config.url); // Debug log
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - Backend server may be slow or not responding');
    } else if (error.message === 'Network Error') {
      console.error('Network Error - Check if backend is running on:', API_URL);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData: any) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      console.error('Register error:', error.message);
      throw error;
    }
  },
  login: async (nickname: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { nickname, password });
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  },
  updateProfile: async (profileData: any) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error.message);
      throw error;
    }
  },
};

export const batAPI = {
  submitAssessment: async (responses: number[]) => {
    try {
      const response = await api.post('/bat/submit', { responses });
      return response.data;
    } catch (error: any) {
      console.error('Submit BAT error:', error.message);
      throw error;
    }
  },
  getLatestAssessment: async () => {
    try {
      const response = await api.get('/bat/latest');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null; // No assessment found
      }
      console.error('Get BAT error:', error.message);
      throw error;
    }
  },
  getAssessmentHistory: async () => {
    try {
      const response = await api.get('/bat/history');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return []; // No history found
      }
      console.error('Get BAT history error:', error.message);
      throw error;
    }
  },
};

export const emojiAPI = {
  submitRating: async (ratingData: any) => {
    try {
      const response = await api.post('/emoji/submit', ratingData);
      return response.data;
    } catch (error: any) {
      console.error('Submit emoji error:', error.message);
      throw error;
    }
  },
  getTodayRating: async () => {
    try {
      const response = await api.get('/emoji/today');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null; // No rating for today
      }
      console.error('Get today emoji error:', error.message);
      throw error;
    }
  },
  getRatingHistory: async (period: 'daily' | 'weekly' | 'monthly') => {
    try {
      const response = await api.get(`/emoji/history?period=${period}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return []; // No history found
      }
      console.error('Get emoji history error:', error.message);
      throw error;
    }
  },
};

export default api;