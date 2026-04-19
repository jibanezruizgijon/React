import { API_URL } from './config';

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
