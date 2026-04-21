import { memo } from 'react';
import { Card, Badge } from 'react-bootstrap';

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

const TarjetaMesa = memo(({ mesa, onClick }) => {
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
TarjetaMesa.displayName = "TarjetaMesa";

export default TarjetaMesa;
