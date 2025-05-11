import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://your-backend-api.com/api', // Replace with actual backend URL
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = (page = 1) => api.get(`/posts?page=${page}`);
export const searchPosts = (query) => api.get(`/posts/search?q=${query}`);
export const getMyPosts = () => api.get('/posts/my');
export const createPost = (data) => api.post('/posts', data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const getPostById = (id) => api.get(`/posts/${id}`);
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

export default api;
