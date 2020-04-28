import axios from 'axios';

const api = axios.create({
  baseURL: 'https://clubedocavalo.shop/api/',
});

export default api;
