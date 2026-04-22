import apiClient from './apiClient';

export const obtenerMesas = async () => {
  const response = await apiClient.get('/mesas');
  return response.data;
};

export const actualizarEstadoMesa = async (id, estado) => {
  const response = await apiClient.put(`/mesas/${id}/estado`, { estado });
  return response.data;
};
