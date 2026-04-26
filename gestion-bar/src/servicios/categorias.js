import apiClient from './apiClient';

export const obtenerCategorias = async () => {
  try {
    const response = await apiClient.get('/categorias');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    throw error;
  }
};
