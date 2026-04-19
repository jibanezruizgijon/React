import { API_URL } from './config';

export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  return await response.json();
};
