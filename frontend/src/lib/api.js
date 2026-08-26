import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchProducts = async (category) => {
  const { data } = await api.get('/products', { params: category ? { category } : {} });
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data;
};
