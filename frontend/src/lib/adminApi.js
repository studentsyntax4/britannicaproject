import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = 'cnc_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

export const adminLogin = async (username, password) => {
  const { data } = await axios.post(`${API}/admin/login`, { username, password });
  return data;
};

export const getStats = async () => {
  const { data } = await axios.get(`${API}/admin/stats`, { headers: authHeaders() });
  return data;
};

export const getAdminOrders = async () => {
  const { data } = await axios.get(`${API}/admin/orders`, { headers: authHeaders() });
  return data;
};

export const updateOrderStatus = async (orderNumber, status) => {
  const { data } = await axios.patch(`${API}/admin/orders/${orderNumber}`, { status }, { headers: authHeaders() });
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await axios.post(`${API}/admin/products`, payload, { headers: authHeaders() });
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await axios.put(`${API}/admin/products/${id}`, payload, { headers: authHeaders() });
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${API}/admin/products/${id}`, { headers: authHeaders() });
  return data;
};
