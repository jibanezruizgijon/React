import { Printer, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, Alert, Button } from 'react-bootstrap';

export default function ResumenInventario({ productos, manejarImprimir }) {
  const totalProductos = productos.length;
  const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  const stockCritico = productos.filter(p => p.stock < 15);
  const stockBajo = productos.filter(p => p.stock >= 15 && p.stock <= 30);
  const stockOk = productos.filter(p => p.stock > 30);

  return (
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
  );
}
