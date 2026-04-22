import apiClient from './apiClient';

export const obtenerCuentaMesa = async (mesaId) => {
  const response = await apiClient.get(`/mesas/${mesaId}/cuenta`);
  return response.data;
};

export const guardarPedido = async (mesaId, producto, cantidad = 1) => {
  const response = await apiClient.post(`/mesas/${mesaId}/cuenta/productos`, { producto: { id: producto.id }, cantidad: parseInt(cantidad, 10) });
  const data = response.data;
  // El backend devuelve { exito, data: [...] }, el frontend esperaba { exito, cuenta: [...] }
  return { exito: data.exito, cuenta: data.data || [] };
};

export const actualizarCantidadProducto = async (mesaId, productoIdCuenta, delta) => {
  const response = await apiClient.put(`/mesas/${mesaId}/cuenta/productos/${productoIdCuenta}`, { delta });
  const data = response.data;
  return { exito: data.exito, cuenta: data.data || [] };
};

export const eliminarProductoCuenta = async (mesaId, productoIdCuenta) => {
  const response = await apiClient.delete(`/mesas/${mesaId}/cuenta/productos/${productoIdCuenta}`);
  const data = response.data;
  return { exito: data.exito, cuenta: data.data || [] };
};

export const cerrarCuenta = async (mesaId) => {
  const response = await apiClient.post(`/mesas/${mesaId}/cuenta/cerrar`);
  return response.data;
};
