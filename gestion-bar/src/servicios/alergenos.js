import apiClient from './apiClient';

export const buscarAlergenos = async (nombre = '') => {
  try {
    const response = await apiClient.get(`/alergenos/buscar?nombre=${encodeURIComponent(nombre)}`);
    return response.data;
  } catch (error) {
    console.error('Error buscando alérgenos:', error);
    throw error;
  }
};
