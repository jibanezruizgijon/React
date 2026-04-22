import axios from 'axios';
import { API_URL } from './config';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Interceptor de peticiones: añade el token JWT a las cabeceras si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas: maneja errores como 401 y 403
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si recibimos un 401 o 403, podríamos querer redirigir al usuario al login
    // o borrar su sesión.
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Opcionalmente borrar localStorage y forzar recarga,
      // aunque es mejor manejarlo en un contexto superior si es posible.
      console.error("Sesión expirada o no autorizada.");
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      // window.location.href = '/login'; // Opcional, pero agresivo
    }
    return Promise.reject(error);
  }
);

export default apiClient;
