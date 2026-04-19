import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { useAuth } from '../contextos/AuthContext';

export default function App() {
  const { usuario } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);


  return (
    <Routes>
      {/* RUTAS DEL CONSUMIDOR (PÚBLICAS) */}
      <Route path="/" element={<ClienteHome />} />
      <Route path="/carta" element={<ClienteCarta />} />
      <Route path="/reserva" element={<ClienteReserva />} />

      {/* RUTA DE LOGIN */}
      <Route path="/login" element={
        !usuario ? (
          <Login />
        ) : (
          <Navigate to={usuario.rol === 'administrador' ? '/admin/trabajadores' : '/mesas'} />
        )
      } />

      {/* RUTAS PROTEGIDAS (TRABAJADORES Y ADMIN) */}
      {usuario && (
        <Route element={
          <div className="d-flex vh-100 bg-light overflow-hidden">
            <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} />
            <div className="flex-grow-1 d-flex flex-column overflow-auto position-relative">
              <div className="p-3 p-md-4 p-lg-5">
                <Cabecera
                  onToggleSidebar={handleToggleSidebar}
                />
                <Routes>
                  {/* Rutas de Camarero */}
                  <Route path="/mesas" element={<PanelPrincipal />} />

                  {/* Rutas de Administrador */}
                  {usuario.rol === 'Administrador' && (
                    <>
                      <Route path="/admin/trabajadores" element={<PanelTrabajadores />} />
                      <Route path="/admin/trabajadores/nuevo" element={<FormularioTrabajador />} />
                      <Route path="/admin/trabajadores/editar/:id" element={<FormularioTrabajador />} />
                      <Route path="/admin/inventario" element={<PanelInventario />} />
                      <Route path="/admin/carta" element={<PanelCarta />} />
                    </>
                  )}
                  {/* Fallback protejido a su rol */}
                  <Route path="*" element={<Navigate to={usuario.rol === 'Administrador' ? '/admin/trabajadores' : '/mesas'} />} />
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
