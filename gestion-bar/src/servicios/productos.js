import apiClient from './apiClient';

export const obtenerProductos = async () => {
  const response = await apiClient.get('/productos');
  return response.data;
};

export const crearProducto = async (producto) => {
  const response = await apiClient.post('/productos', producto);
  return response.data;
};

export const actualizarProducto = async (id, producto) => {
  const response = await apiClient.put(`/productos/${id}`, producto);
  return response.data;
};

export const eliminarProducto = async (id) => {
  const response = await apiClient.delete(`/productos/${id}`);
  return response.data;
};
