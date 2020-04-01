import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kepy.com.br/api',
});

export default api;
