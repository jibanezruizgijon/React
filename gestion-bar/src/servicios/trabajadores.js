import apiClient from './apiClient';

export const obtenerPersonal = async () => {
  const response = await apiClient.get('/personal');
  return response.data;
};

export const agregarPersonal = async (nuevo) => {
  const response = await apiClient.post('/personal', nuevo);
  const trabajador = response.data;
  return { exito: true, trabajador };
};

export const eliminarPersonal = async (id) => {
  const response = await apiClient.delete(`/personal/${id}`);
  return response.data;
};

export const actualizarPersonal = async (actualizado) => {
  const response = await apiClient.put(`/personal/${actualizado.id}`, actualizado);
  return response.data;
};
