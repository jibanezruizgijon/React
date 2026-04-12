import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './Login';
import PanelPrincipal from './trabajador/PanelPrincipal';
import PanelTrabajadores from './administrador/PanelTrabajadores';
import FormularioTrabajador from './administrador/FormularioTrabajador';
import PanelInventario from './administrador/PanelInventario';
import PanelCarta from './administrador/PanelCarta';
import ClienteHome from './cliente/ClienteHome';
import ClienteCarta from './cliente/ClienteCarta';
import ClienteReserva from './cliente/ClienteReserva';
import Sidebar from '../componentes/Sidebar';
import Cabecera from '../componentes/Cabecera';
import { Container } from 'react-bootstrap';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const manejarCerrarSesion = () => {
    setUsuarioAutenticado(null);
    navigate('/login');
  };

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);

  // Rutas públicas a las que puede acceder cualquier usuario sin login
  const rutasPublicas = ['/', '/carta', '/reserva'];

  useEffect(() => {
    // Si no está logueado, no está en una ruta pública ni en '/login', lo mandamos al login
    if (!usuarioAutenticado && location.pathname !== '/login' && !rutasPublicas.includes(location.pathname)) {
      navigate('/login');
    }
  }, [usuarioAutenticado, location.pathname, navigate, rutasPublicas]);

  const manejarLogin = (usuario) => {
    setUsuarioAutenticado(usuario);
    if (usuario.rol === 'Administrador') {
      navigate('/admin/trabajadores');
    } else {
      navigate('/mesas');
    }
  };

  return (
    <Routes>
      {/* RUTAS DEL CONSUMIDOR (PÚBLICAS) */}
      <Route path="/" element={<ClienteHome />} />
      <Route path="/carta" element={<ClienteCarta />} />
      <Route path="/reserva" element={<ClienteReserva />} />

      {/* RUTA DE LOGIN */}
      <Route path="/login" element={
        !usuarioAutenticado ? (
          <Login onLoginExitoso={manejarLogin} />
        ) : (
          <Navigate to={usuarioAutenticado.rol === 'Administrador' ? '/admin/trabajadores' : '/mesas'} />
        )
      } />
      
      {/* RUTAS PROTEGIDAS (TRABAJADORES Y ADMIN) */}
      {usuarioAutenticado && (
        <Route element={
          <div className="d-flex vh-100 bg-light overflow-hidden">
            <Sidebar usuario={usuarioAutenticado} show={showSidebar} onHide={() => setShowSidebar(false)} />
            <div className="flex-grow-1 d-flex flex-column overflow-auto position-relative">
              <div className="p-3 p-md-4 p-lg-5">
                <Cabecera 
                  usuarioAutenticado={usuarioAutenticado} 
                  onCerrarSesion={manejarCerrarSesion} 
                  onToggleSidebar={handleToggleSidebar} 
                />
                <Routes>
                  {/* Rutas de Camarero */}
                  <Route path="/mesas" element={<PanelPrincipal usuarioAutenticado={usuarioAutenticado} />} />
                  
                  {/* Rutas de Administrador */}
                  {usuarioAutenticado.rol === 'Administrador' && (
                    <>
                      <Route path="/admin/trabajadores" element={<PanelTrabajadores />} />
                      <Route path="/admin/trabajadores/nuevo" element={<FormularioTrabajador />} />
                      <Route path="/admin/trabajadores/editar/:id" element={<FormularioTrabajador />} />
                      <Route path="/admin/inventario" element={<PanelInventario />} />
                      <Route path="/admin/carta" element={<PanelCarta />} />
                    </>
                  )}
                  {/* Fallback protejido a su rol */}
                  <Route path="*" element={<Navigate to={usuarioAutenticado.rol === 'Administrador' ? '/admin/trabajadores' : '/mesas'} />} />
                </Routes>
              </div>
            </div>
          </div>
        }>
           {/* El asterisco aquí asegura que todas las rutas bajo autenticación sean procesadas */}
          <Route path="/*" />
        </Route>
      )}
    </Routes>
  );
}
