import { API_URL } from './config';
import axios from 'axios';

export const obtenerProductos = async () => {
  const response = await axios.get(`${API_URL}/productos`);
  return response.data;
};
