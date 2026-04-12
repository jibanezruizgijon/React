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
      className={`h-100 text-center cursor-pointer shadow-sm border-${config.border}`}
      style={{ cursor: 'pointer', transition: 'transform 0.2s', borderWidth: '2px' }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
        {mesa.capacidad && (
          <Badge bg="secondary" className="position-absolute py-1 px-2 mb-2" style={{ top: '10px', right: '10px' }}>
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
          <span className="rounded-circle bg-success" style={{width: '12px', height: '12px'}}></span> Libre
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="rounded-circle bg-danger" style={{width: '12px', height: '12px'}}></span> Ocupada
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="rounded-circle bg-warning" style={{width: '12px', height: '12px'}}></span> Reservada
        </div>
      </div>
    </div>
  );
}
