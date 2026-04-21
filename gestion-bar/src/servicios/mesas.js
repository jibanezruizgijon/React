import { API_URL } from './config';
import axios from 'axios';

export const obtenerMesas = async () => {
  const response = await axios.get(`${API_URL}/mesas`);
  return response.data;
};

export const actualizarEstadoMesa = async (id, estado) => {
  const response = await axios.put(`${API_URL}/mesas/${id}/estado`, { estado });
  return response.data;
};
