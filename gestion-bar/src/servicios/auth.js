import { API_URL } from './config';
import axios from 'axios';

export const validarAcceso = async (pin) => {
  try {
    const response = await axios.post(`${API_URL}/auth/validar`, { pin });
    return response.data;
  } catch (error) {
    throw new Error('Código incorrecto o usuario inactivo');
  }
};
