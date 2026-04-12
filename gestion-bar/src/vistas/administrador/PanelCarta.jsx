import { useState, useEffect, memo } from 'react';
import { PlusCircle } from 'lucide-react';
import { obtenerProductos } from '../../servicios/api';
import { Card, Row, Col, Badge, Button, Spinner } from 'react-bootstrap';

const ProductoCarta = memo(({ producto }) => (
  <Card className="h-100 border-0 shadow-sm flex-row overflow-hidden transition-all hover-transform">
    <div className="bg-light d-flex align-items-center justify-content-center p-2 img-130">
      <img 
        src={`https://source.unsplash.com/random/200x200/?food,${encodeURI(producto.nombre)}`} 
        alt={producto.nombre} 
        className="w-100 h-100 object-fit-cover rounded shadow-sm opacity-75 aspect-square"
        onError={(e) => {
           e.target.classList.add('d-none');
        }}
      />
    </div>
    
    <Card.Body className="d-flex flex-column justify-content-between p-3">
      <div>
        <h3 className="h6 fw-bold text-dark text-truncate mb-1" title={producto.nombre}>{producto.nombre}</h3>
        <p className="small text-secondary mb-0 line-clamp-2">
          {producto.categoria}. Preparado con los mejores ingredientes frescos.
        </p>
      </div>
      
      <div className="d-flex justify-content-between align-items-end mt-3">
        <div className="d-flex gap-1">
           <Badge bg="warning" text="dark" pill className="border border-warning" title="Contiene gluten">G</Badge>
           <Badge bg="info" text="dark" pill className="border border-info" title="Contiene lácteos">L</Badge>
        </div>
        
        <div>
          <Badge bg="primary" className="fs-6 py-2 px-3 rounded-pill shadow-sm">
            {producto.precio.toFixed(2)}€
          </Badge>
        </div>
      </div>
    </Card.Body>
  </Card>
));
ProductoCarta.displayName = "ProductoCarta";

export default function PanelCarta() {
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
      <div className="mt-3 fw-bold">Cargando carta...</div>
    </div>
  );

  return (
    <div className="d-flex flex-column gap-4 pb-5">
      <Card className="border-0 shadow-sm p-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <div>
            <h2 className="fs-3 fw-black text-dark mb-1">Menú del Restaurante</h2>
            <p className="text-secondary small fw-medium mb-0">Gestione los platos y bebidas ofrecidos</p>
          </div>
          <Button variant="primary" onClick={() => alert("Se abriría modal de Nuevo Producto (WIP)")} className="fw-bold px-4 py-3 d-flex align-items-center gap-2 shadow-sm">
            <PlusCircle className="w-5 h-5" /> Nuevo Producto
          </Button>
        </div>
      </Card>

      <Row xs={1} md={2} xl={3} className="g-4">
        {productos.map(p => (
          <Col key={p.id}>
            <ProductoCarta producto={p} />
          </Col>
        ))}
      </Row>
      
      <div className="text-center pt-4">
        <Button variant="dark" size="lg" className="px-5 fw-bold shadow-lg rounded-pill">
          Finalizar Edición
        </Button>
      </div>
    </div>
  );
}
