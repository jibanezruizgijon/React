import { API_URL } from './config';

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
