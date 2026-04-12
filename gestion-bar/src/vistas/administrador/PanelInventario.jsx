import { useState, useEffect } from 'react';
import { Printer, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { obtenerProductos } from '../../servicios/api';
import { Row, Col, Card, Alert, Table, Badge, Button, Spinner } from 'react-bootstrap';

export default function PanelInventario() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerProductos().then(data => {
      setProductos(data);
      setCargando(false);
    });
  }, []);

  if (cargando) return (
    <div className="text-center p-5 text-primary">
      <Spinner animation="border" />
      <div className="mt-3 fw-bold">Cargando inventario...</div>
    </div>
  );

  const totalProductos = productos.length;
  const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);

  const stockCritico = productos.filter(p => p.stock < 15);
  const stockBajo = productos.filter(p => p.stock >= 15 && p.stock <= 30);
  const stockOk = productos.filter(p => p.stock > 30);

  // Agrupar por categoría
  const porCategoria = productos.reduce((acc, p) => {
    if (!acc[p.categoria]) acc[p.categoria] = [];
    acc[p.categoria].push(p);
    return acc;
  }, {});

  const manejarImprimir = () => {
    window.print();
  };

  return (
    <Row className="g-4">
      {/* Panel Izquierdo: Contabilidad y Alertas */}
      <Col lg={4}>
        <Card className="bg-primary text-white shadow-lg border-0 h-100">
          <Card.Body className="p-4 d-flex flex-column">
            <h2 className="fs-5 fw-bold mb-4 border-bottom border-light pb-3 text-center text-uppercase">Contabilidad</h2>
            
            <div className="text-center mb-5">
              <p className="text-white-50 fw-semibold mb-1">Valor de inventario:</p>
              <h3 className="display-4 fw-black mb-3">{valorTotal.toFixed(2)}€</h3>
              <p className="text-white-50 fw-semibold fs-6">
                Total Productos: <span className="text-white fw-bold">{totalProductos}</span>
              </p>
            </div>

            <div className="d-flex flex-column gap-3 mb-4 flex-grow-1">
              <Alert variant="warning" className="border-0 bg-opacity-10 text-white m-0 d-flex align-items-center gap-3">
                <TrendingDown className="w-6 h-6 text-warning" />
                <div>
                  <div className="fw-bold small text-warning text-uppercase">Stock Bajo</div>
                  <div className="fw-semibold">{stockBajo.length} productos</div>
                </div>
              </Alert>

              <Alert variant="danger" className="border-0 bg-opacity-10 text-white m-0 d-flex align-items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-danger" />
                <div>
                  <div className="fw-bold small text-danger text-uppercase">Stock Crítico</div>
                  <div className="fw-semibold">{stockCritico.length} productos</div>
                </div>
              </Alert>

              <Alert variant="success" className="border-0 bg-opacity-10 text-white m-0 d-flex align-items-center gap-3">
                <CheckCircle className="w-6 h-6 text-success" />
                <div>
                  <div className="fw-bold small text-success text-uppercase">Stock OK</div>
                  <div className="fw-semibold">{stockOk.length} productos</div>
                </div>
              </Alert>
            </div>

            <Button 
              variant="light" 
              onClick={manejarImprimir}
              className="w-100 py-3 fw-bold text-primary d-flex justify-content-center align-items-center gap-2 mt-auto"
            >
              <Printer className="w-5 h-5" /> Imprimir Contabilidad
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Panel Derecho: Lista Inventario */}
      <Col lg={8}>
        <Card className="border-0 shadow-sm overflow-hidden h-100">
          <Card.Header className="bg-primary text-white py-3 text-center border-0">
            <h2 className="fs-5 fw-bold m-0 tracking-widest text-uppercase">Inventario Detallado</h2>
          </Card.Header>
          
          <Card.Body className="p-0">
            <div className="p-4 mh-600 overflow-auto custom-scrollbar">
              {Object.keys(porCategoria).map(cat => (
                <div key={cat} className="mb-4">
                  <h3 className="fs-6 bg-light text-primary fw-bold p-3 m-0 rounded-top border border-bottom-0">
                    {cat}
                  </h3>
                  
                  <Table bordered hover responsive className="m-0 border-top-0">
                    <thead className="table-light">
                      <tr>
                        <th className="text-secondary small text-uppercase">Producto</th>
                        <th className="text-center text-secondary small text-uppercase w-90">Stock</th>
                        <th className="text-center text-secondary small text-uppercase w-90">Mínimo</th>
                        <th className="text-center text-secondary small text-uppercase w-90">Crítico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {porCategoria[cat].map(p => (
                        <tr key={p.id}>
                          <td className="fw-medium text-dark align-middle">{p.nombre}</td>
                          <td className="text-center align-middle">
                            <Badge 
                              bg={p.stock < 15 ? 'danger' : p.stock <= 30 ? 'warning' : 'success'}
                              className="px-3 py-2 rounded-pill fs-6"
                            >
                              {p.stock}
                            </Badge>
                          </td>
                          <td className="text-center align-middle text-muted fw-bold">30</td>
                          <td className="text-center align-middle text-danger opacity-75 fw-bold">15</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-light border-top text-center">
              <Button 
                variant="outline-primary"
                onClick={manejarImprimir}
                className="px-5 py-2 fw-bold d-inline-flex align-items-center gap-2"
              >
                <Printer className="w-5 h-5" /> Exportar Inventario
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
