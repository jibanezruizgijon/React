import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Rutas públicas a las que puede acceder cualquier usuario sin login
  const rutasPublicas = ['/', '/carta', '/reserva'];

  useEffect(() => {
    // Si no está logueado, no está en una ruta pública ni en '/login', lo mandamos al login
    if (!usuarioAutenticado && location.pathname !== '/login' && !rutasPublicas.includes(location.pathname)) {
      navigate('/login');
    }
  }, [usuarioAutenticado, location.pathname, navigate]);

  const login = (usuario) => {
    setUsuarioAutenticado(usuario);
    if (usuario.rol === 'Administrador') {
      navigate('/admin/trabajadores');
    } else {
      navigate('/mesas');
    }
  };

  const logout = () => {
    setUsuarioAutenticado(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      usuario: usuarioAutenticado,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
