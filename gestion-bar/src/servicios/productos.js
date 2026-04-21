import { API_URL } from './config';
import axios from 'axios';

export const obtenerProductos = async () => {
  const response = await axios.get(`${API_URL}/productos`);
  return response.data;
};

export const crearProducto = async (producto) => {
  const response = await axios.post(`${API_URL}/productos`, producto);
  return response.data;
};

export const actualizarProducto = async (id, producto) => {
  const response = await axios.put(`${API_URL}/productos/${id}`, producto);
  return response.data;
};

export const eliminarProducto = async (id) => {
  const response = await axios.delete(`${API_URL}/productos/${id}`);
  return response.data;
};
