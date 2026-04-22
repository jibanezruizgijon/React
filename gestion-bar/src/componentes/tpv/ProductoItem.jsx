import { memo } from 'react';
import { Button, Badge, ListGroup } from 'react-bootstrap';
import { Plus, Minus, Trash2 } from 'lucide-react';

const ProductoItem = memo(({ producto, onAumentar, onReducir, onEliminarFila, isLibre }) => {
  return (
    <ListGroup.Item className="d-flex flex-column py-3 border-0 bg-light rounded mb-2 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <Badge bg="primary" className="fw-bold px-2 py-1 fs-6 shadow-sm">
            {producto.cantidad}
          </Badge>
          <div>
            <span className="fw-bold text-dark d-block lh-1 text-truncate mw-150" title={producto.nombre}>{producto.nombre}</span>
            <span className="text-secondary small d-block">${producto.precio.toFixed(2)} c/u</span>
          </div>
        </div>
        <span className="fw-bold text-dark fs-5">
          ${(producto.precio * producto.cantidad).toFixed(2)}
        </span>
      </div>
      
      {!isLibre && (
        <div className="d-flex justify-content-between align-items-center mt-2 border-top pt-2">
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" className="rounded-circle p-1 d-flex shadow-sm" onClick={() => onReducir(producto.id)}>
              <Minus className="w-4 h-4" />
            </Button>
            <Button variant="outline-primary" size="sm" className="rounded-circle p-1 d-flex shadow-sm" onClick={() => onAumentar(producto.id)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline-danger" size="sm" className="p-1 px-2 d-flex align-items-center gap-1 shadow-sm border-0" onClick={() => onEliminarFila(producto.id)}>
            <Trash2 className="w-4 h-4" /> <span className="small fw-semibold">Quitar</span>
          </Button>
        </div>
      )}
    </ListGroup.Item>
  );
});

ProductoItem.displayName = "ProductoItem";

export default ProductoItem;
