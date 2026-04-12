import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Phone, Mail } from 'lucide-react';
import { obtenerPersonal } from '../../servicios/api';
import { Card, Badge, Spinner, Button, Row, Col } from 'react-bootstrap';

const TarjetaTrabajador = memo(({ trabajador }) => (
  <Card className="mb-3 border-0 shadow-sm transition-all hover-transform">
    <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 p-4">
      <div className="flex-grow-1 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
          <h3 className="h5 fw-bold text-dark mb-0">{trabajador.nombre}</h3>
          <Badge bg={trabajador.estado ? 'success' : 'danger'} pill className="text-uppercase" style={{fontSize: '0.7rem'}}>
            {trabajador.estado ? 'Alta' : 'De Baja'}
          </Badge>
        </div>
        <p className="text-secondary fw-semibold mb-3">{trabajador.rol}</p>
        
        <div className="d-flex flex-column flex-sm-row gap-2 gap-md-4 text-secondary small fw-medium">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
            <Phone className="text-primary w-4 h-4" />
            <span>{trabajador.telefono}</span>
          </div>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
            <Mail className="text-primary w-4 h-4" />
            <span>{trabajador.correo}</span>
          </div>
        </div>
      </div>
      <div>
        <Button 
          as={Link} 
          to={`/admin/trabajadores/editar/${trabajador.id}`}
          variant="primary"
          className="fw-bold px-4 py-2"
        >
          Administrar
        </Button>
      </div>
    </Card.Body>
  </Card>
));
TarjetaTrabajador.displayName = "TarjetaTrabajador";

export default function PanelTrabajadores() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerPersonal().then(data => {
      setTrabajadores(data);
      setCargando(false);
    });
  }, []);

  if (cargando) return (
    <div className="text-center p-5 text-primary">
      <Spinner animation="border" />
      <div className="mt-3 fw-bold">Cargando personal...</div>
    </div>
  );

  const totalActivos = trabajadores.filter(t => t.estado).length;
  const totalBajas = trabajadores.length - totalActivos;

  return (
    <div className="d-flex flex-column gap-4">
      <Card className="border-0 shadow-sm p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div className="d-flex gap-3">
            <div className="bg-light border border-primary border-opacity-25 rounded px-4 py-3 text-center">
              <span className="d-block small fw-bold text-primary text-uppercase mb-1">Total Personal</span>
              <span className="fs-3 fw-black text-dark">{trabajadores.length}</span>
            </div>
            <div className="bg-light border border-danger border-opacity-25 rounded px-4 py-3 text-center">
              <span className="d-block small fw-bold text-danger text-uppercase mb-1">De Bajas</span>
              <span className="fs-3 fw-black text-danger">{totalBajas}</span>
            </div>
          </div>
          
          <Button 
            as={Link} 
            to="/admin/trabajadores/nuevo"
            variant="primary"
            className="d-flex align-items-center gap-2 fw-bold px-4 py-3 shadow-sm"
          >
            <UserPlus className="w-5 h-5" />
            Añadir Trabajador
          </Button>
        </div>
      </Card>

      <div>
        <div className="bg-primary text-white p-3 px-4 rounded-top d-flex align-items-center gap-2 shadow-sm">
          <Users className="w-5 h-5" />
          <h2 className="fs-5 fw-bold mb-0">Lista de Trabajadores</h2>
        </div>
        <div className="bg-white p-4 rounded-bottom shadow-sm border border-top-0">
          {trabajadores.map(t => <TarjetaTrabajador key={t.id} trabajador={t} />)}
        </div>
      </div>
    </div>
  );
}
