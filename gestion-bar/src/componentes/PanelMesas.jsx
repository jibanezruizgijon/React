import { Row, Col } from 'react-bootstrap';
import TarjetaMesa from './TarjetaMesa';

export default function PanelMesas({ mesas, onSeleccionarMesa }) {
  return (
    <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
      <h2 className="h3 fw-bold text-primary mb-4">
        Estado del Salón
      </h2>
      
      <Row xs={2} md={3} lg={4} className="g-4">
        {mesas.map((mesa) => (
          <Col key={mesa.id}>
            <TarjetaMesa mesa={mesa} onClick={onSeleccionarMesa} />
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
