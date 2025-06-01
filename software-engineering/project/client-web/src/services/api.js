// /src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';
const api = axios.create({ baseURL: API_URL });

// Attach token automatically to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth endpoints
export const register = data => api.post('/api/auth/register', data);
export const login = data => api.post('/api/auth/login', data);
export const getProfile = () => api.get('/api/auth/profile');

// Excuse endpoints (example)
export const fetchExcuses = () => api.get('/api/excuses');
export const addExcuse = text => api.post('/api/excuses', { text });

// Generator endpoints
export const generateExcuse = data => api.post('/api/generator/generate', data);
export const surpriseMe = () => api.post('/api/generator/surprise');
export const getOptions = () => api.get('/api/generator/options');

// Vote endpoints
export const voteExcuse = (excuseId, voteType) => api.post(`/api/votes/${excuseId}`, { voteType });
export const getUserVote = excuseId => api.get(`/api/votes/${excuseId}/user`);
export const getHallOfFame = () => api.get('/api/votes/hall-of-fame');

export default api;
