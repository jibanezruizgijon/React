import { API_URL } from './config';

export const obtenerCuentaMesa = async (mesaId) => {
  const response = await fetch(`${API_URL}/mesas/${mesaId}/cuenta`);
  return await response.json();
};

export const guardarPedido = async (mesaId, producto, cantidad = 1) => {
  const response = await fetch(`${API_URL}/mesas/${mesaId}/cuenta/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ producto: { id: producto.id }, cantidad: parseInt(cantidad, 10) })
  });
  const data = await response.json();
  // El backend devuelve { exito, data: [...] }, el frontend esperaba { exito, cuenta: [...] }
  return { exito: data.exito, cuenta: data.data || [] };
};

export const actualizarCantidadProducto = async (mesaId, productoIdCuenta, delta) => {
  const response = await fetch(`${API_URL}/mesas/${mesaId}/cuenta/productos/${productoIdCuenta}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ delta })
  });
  const data = await response.json();
  return { exito: data.exito, cuenta: data.data || [] };
};

export const eliminarProductoCuenta = async (mesaId, productoIdCuenta) => {
  const response = await fetch(`${API_URL}/mesas/${mesaId}/cuenta/productos/${productoIdCuenta}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return { exito: data.exito, cuenta: data.data || [] };
};

export const cerrarCuenta = async (mesaId) => {
  const response = await fetch(`${API_URL}/mesas/${mesaId}/cuenta/cerrar`, {
    method: 'POST'
  });
  return await response.json();
};
