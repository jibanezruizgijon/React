import { memo } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

const ESTADOS = {
  libre: 'libre',
  ocupada: 'ocupada',
  reservada: 'reservada',
};

const estilosPorEstado = {
  [ESTADOS.libre]: { bg: 'success', text: 'white', border: 'success' },
  [ESTADOS.ocupada]: { bg: 'danger', text: 'white', border: 'danger' },
  [ESTADOS.reservada]: { bg: 'warning', text: 'dark', border: 'warning' },
};

const MesaItem = memo(({ mesa, onClick }) => {
  const config = estilosPorEstado[mesa.estado] || estilosPorEstado.libre;
  
  return (
    <Card 
      onClick={() => onClick(mesa)}
      className={`h-100 text-center cursor-pointer shadow-sm border-${config.border} hover-lift border-2`}
    >
      <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
        {mesa.capacidad && (
          <Badge bg="secondary" className="position-absolute top-0 end-0 m-2 mt-2 me-2 py-1 px-2 mb-2">
            👤 {mesa.capacidad}
          </Badge>
        )}
        <span className="display-4 mb-2">🍽️</span>
        <h3 className="h5 fw-bold mb-2">Mesa {mesa.nMesa || mesa.numero}</h3>
        <Badge bg={config.bg} text={config.text} className="px-3 py-2 rounded-pill text-uppercase">
          {mesa.estado}
        </Badge>
      </Card.Body>
    </Card>
  );
});
MesaItem.displayName = "MesaItem";

export default function PanelMesas({ mesas, onSeleccionarMesa }) {
  return (
    <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
      <h2 className="h3 fw-bold text-primary mb-4">
        Estado del Salón
      </h2>
      
      <Row xs={2} md={3} lg={4} className="g-4">
        {mesas.map((mesa) => (
          <Col key={mesa.id}>
            <MesaItem mesa={mesa} onClick={onSeleccionarMesa} />
          </Col>
        ))}
      </Row>
      
      {/* Leyenda */}
      <div className="mt-5 d-flex gap-4 small fw-medium justify-content-center border-top pt-4 text-secondary">
        <div className="d-flex align-items-center gap-2">
          <span className="rounded-circle bg-success square-12"></span> Libre
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="rounded-circle bg-danger square-12"></span> Ocupada
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="rounded-circle bg-warning square-12"></span> Reservada
        </div>
      </div>
    </div>
  );
}
