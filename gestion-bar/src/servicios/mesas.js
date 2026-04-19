import { API_URL } from './config';

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
