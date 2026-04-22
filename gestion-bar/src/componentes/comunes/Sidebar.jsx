import { NavLink } from 'react-router-dom';
import { 
  Users, 
  ClipboardList, 
  BookOpen, 
  LayoutDashboard 
} from 'lucide-react';

import '../../estilos/global.css'; // For custom styling if needed
import { useAuth } from '../../contextos/AuthContext';
import { Offcanvas, Nav, Badge } from 'react-bootstrap';
export default function Sidebar({ show, onHide }) {
  const { usuario } = useAuth();
  const isAdmin = usuario?.rol === 'Administrador';

  const adminLinks = [
    { to: '/admin/inventario', text: 'Inventario', icon: <ClipboardList className="w-5 h-5" /> },
    { to: '/admin/trabajadores', text: 'Personal', icon: <Users className="w-5 h-5" /> },
    { to: '/admin/carta', text: 'Editar Carta', icon: <BookOpen className="w-5 h-5" /> }
  ];

  const camareroLinks = [
    { to: '/mesas', text: 'Gestión de mesas', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  const links = isAdmin ? adminLinks : camareroLinks;

  const SidebarContent = () => (
    <div className="d-flex flex-column h-100 py-4">
      <div className="text-center w-100 mb-4 px-3 border-bottom border-light pb-3">
        <h2 className="h5 fw-bold text-white text-truncate">
          Mi Restaurante
        </h2>
        
        <div className="mt-3 bg-white bg-opacity-10 rounded p-2 d-flex flex-column text-start">
           <span className="small text-white-50">Trabajador:</span>
           <span className="fw-semibold text-white text-truncate">{usuario?.nombre || 'Desconocido'}</span>
           <Badge bg="success" className="align-self-start mt-1 text-uppercase">{usuario?.rol || 'Rol'}</Badge>
        </div>
      </div>

      <Nav className="flex-column flex-grow-1 w-100 px-3 gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-3 p-3 rounded fw-semibold text-white transition-all ${
                isActive
                  ? 'bg-primary shadow'
                  : 'text-white-50 hover-bg-primary-light'
              }`
            }
            onClick={onHide} // Close offcanvas on navigation mapping mobile
          >
            {link.icon}
            <span>{link.text}</span>
          </NavLink>
        ))}
      </Nav>
      
      <div className="w-100 px-3 mt-auto text-center opacity-50">
        <div className="small text-white">Gestión Bar v2.0</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar for Desktop */}
      <div 
        className="d-none d-lg-block bg-dark text-white shadow-lg flex-shrink-0 sidebar-desktop" 
      >
        <SidebarContent />
      </div>

      {/* Offcanvas for Mobile */}
      <Offcanvas show={show} onHide={onHide} className="bg-dark text-white d-lg-none">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="fw-bold">GestiónBar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
