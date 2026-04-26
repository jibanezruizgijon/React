import apiClient from './apiClient';

export const obtenerAlergenos = async () => {
  try {
    const response = await apiClient.get('/alergenos');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo alérgenos:', error);
    throw error;
  }
};
