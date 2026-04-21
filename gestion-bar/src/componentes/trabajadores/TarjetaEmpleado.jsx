import { memo } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const TarjetaEmpleado = memo(({ trabajador }) => (
  <Card className="mb-3 border-0 shadow-sm">
    <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 p-4">
      <div className="flex-grow-1 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
          <h3 className="h5 fw-bold text-dark mb-0">{trabajador.nombre}</h3>
          <Badge bg={trabajador.estado ? 'success' : 'danger'} pill className="text-uppercase fs-8">
            {trabajador.estado ? 'Alta' : 'De Baja'}
          </Badge>
        </div>
        <p className="text-secondary fw-semibold mb-3">{trabajador.rol}</p>
        
        <div className="d-flex flex-column flex-sm-row gap-2 gap-md-4 text-secondary small fw-medium">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
            <Phone className="text-primary" size={16} />
            <span>{trabajador.telefono}</span>
          </div>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
            <Mail className="text-primary" size={16} />
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
TarjetaEmpleado.displayName = "TarjetaEmpleado";

export default TarjetaEmpleado;
