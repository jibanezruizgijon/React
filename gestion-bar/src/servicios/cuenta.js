import { API_URL } from './config';
import axios from 'axios';

export const obtenerCuentaMesa = async (mesaId) => {
  const response = await axios.get(`${API_URL}/mesas/${mesaId}/cuenta`);
  return response.data;
};

export const guardarPedido = async (mesaId, producto, cantidad = 1) => {
  const response = await axios.post(`${API_URL}/mesas/${mesaId}/cuenta/productos`, { producto: { id: producto.id }, cantidad: parseInt(cantidad, 10) });
  const data = response.data;
  // El backend devuelve { exito, data: [...] }, el frontend esperaba { exito, cuenta: [...] }
  return { exito: data.exito, cuenta: data.data || [] };
};

export const actualizarCantidadProducto = async (mesaId, productoIdCuenta, delta) => {
  const response = await axios.put(`${API_URL}/mesas/${mesaId}/cuenta/productos/${productoIdCuenta}`, { delta });
  const data = response.data;
  return { exito: data.exito, cuenta: data.data || [] };
};

export const eliminarProductoCuenta = async (mesaId, productoIdCuenta) => {
  const response = await axios.delete(`${API_URL}/mesas/${mesaId}/cuenta/productos/${productoIdCuenta}`);
  const data = response.data;
  return { exito: data.exito, cuenta: data.data || [] };
};

export const cerrarCuenta = async (mesaId) => {
  const response = await axios.post(`${API_URL}/mesas/${mesaId}/cuenta/cerrar`);
  return response.data;
};
