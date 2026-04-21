import { API_URL } from './config';
import axios from 'axios';

export const obtenerPersonal = async () => {
  const response = await axios.get(`${API_URL}/personal`);
  return response.data;
};

export const agregarPersonal = async (nuevo) => {
  const response = await axios.post(`${API_URL}/personal`, nuevo);
  const trabajador = response.data;
  return { exito: true, trabajador };
};

export const eliminarPersonal = async (id) => {
  const response = await axios.delete(`${API_URL}/personal/${id}`);
  return response.data;
};

export const actualizarPersonal = async (actualizado) => {
  const response = await axios.put(`${API_URL}/personal/${actualizado.id}`, actualizado);
  return response.data;
};
