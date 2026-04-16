// api.js
// Servicio de conexión con Backend Spring Boot

const API_URL = 'http://localhost:8080/api';

export const obtenerMesas = async () => {
  const response = await fetch(`${API_URL}/mesas`);
  return await response.json();
};

export const actualizarEstadoMesa = async (id, estado) => {
  const response = await fetch(`${API_URL}/mesas/${id}/estado`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  });
  return await response.json();
};

export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  return await response.json();
};

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

export const validarAcceso = async (pin) => {
  const response = await fetch(`${API_URL}/auth/validar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin })
  });
  
  if (!response.ok) {
    throw new Error('Código incorrecto o usuario inactivo');
  }
  
  return await response.json();
};

// Admin Endpoints
export const obtenerPersonal = async () => {
  const response = await fetch(`${API_URL}/personal`);
  return await response.json();
};

export const agregarPersonal = async (nuevo) => {
  const response = await fetch(`${API_URL}/personal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevo)
  });
  const trabajador = await response.json();
  return { exito: true, trabajador };
};

export const eliminarPersonal = async (id) => {
  const response = await fetch(`${API_URL}/personal/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};

export const actualizarPersonal = async (actualizado) => {
  const response = await fetch(`${API_URL}/personal/${actualizado.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actualizado)
  });
  return await response.json();
};
