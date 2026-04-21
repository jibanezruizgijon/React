import { useState, useEffect } from 'react';
import { obtenerProductos } from '../../servicios/api';
import { Row, Col, Spinner } from 'react-bootstrap';
import ResumenInventario from '../../componentes/ResumenInventario';
import TablaInventario from '../../componentes/TablaInventario';

export default function PanelInventario() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerProductos().then(data => {
      setProductos(data);
      setCargando(false);
    });
  }, []);

  const manejarImprimir = () => {
    window.print();
  };

  if (cargando) return (
    <div className="text-center p-5 text-primary">
      <Spinner animation="border" />
      <div className="mt-3 fw-bold">Cargando inventario...</div>
    </div>
  );

  return (
    <Row className="g-4">
      {/* Panel Izquierdo: Contabilidad y Alertas */}
      <Col lg={4}>
        <ResumenInventario productos={productos} manejarImprimir={manejarImprimir} />
      </Col>

      {/* Panel Derecho: Lista Inventario */}
      <Col lg={8}>
        <TablaInventario productos={productos} manejarImprimir={manejarImprimir} />
      </Col>
    </Row>
  );
}
