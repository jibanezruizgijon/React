import { memo } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Edit2 } from 'lucide-react';

const ProductoCarta = memo(({ producto, onEdit }) => (
  <Card className="h-100 border-0 shadow-sm flex-row overflow-hidden transition-all hover-transform position-relative">
    <Button 
      variant="light" 
      size="sm" 
      onClick={() => onEdit(producto)} 
      className="position-absolute top-0 end-0 m-2 shadow-sm rounded-circle p-2 bg-white bg-opacity-75 hover-bg-white border-0 z-1"
      title="Editar Producto"
    >
      <Edit2 size={16} className="text-secondary" />
    </Button>
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

export default ProductoCarta;
