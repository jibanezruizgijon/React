import { memo } from 'react';
import { Card, Button, Badge, ListGroup } from 'react-bootstrap';
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
            <span className="fw-bold text-dark d-block lh-1 text-truncate" style={{maxWidth: '150px'}} title={producto.nombre}>{producto.nombre}</span>
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

export default function CuentaDetalle({ mesaSeleccionada, productosCuenta, onAgregarProducto, onCerrarCuenta, onAumentar, onReducir, onEliminarFila }) {
  if (!mesaSeleccionada) {
    return (
      <Card className="h-100 border-dashed bg-light d-flex align-items-center justify-content-center text-muted p-5 text-center min-vh-50" style={{ borderStyle: 'dashed', borderWidth: '2px' }}>
        <span className="display-1 mb-3 opacity-50">🎫</span>
        <h4 className="fw-medium">Selecciona una mesa para ver su cuenta</h4>
      </Card>
    );
  }

  const isOcupada = mesaSeleccionada.estado === 'ocupada';
  const isLibre = mesaSeleccionada.estado === 'libre';

  const totalCuenta = productosCuenta.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0);

  return (
    <Card className="h-100 shadow-sm border-0 d-flex flex-column position-relative">
      <Card.Header className="bg-white border-bottom p-4 d-flex justify-content-between align-items-start z-1">
        <div>
          <h2 className="h4 fw-bold text-dark mb-1">Detalle de Cuenta</h2>
          <p className="text-secondary mb-0 fw-medium">Mesa {mesaSeleccionada.nMesa || mesaSeleccionada.numero}</p>
        </div>
        <Badge 
          bg={isOcupada ? 'danger' : 'secondary'} 
          className="text-uppercase px-3 py-2 rounded-pill shadow-sm"
        >
          {mesaSeleccionada.estado}
        </Badge>
      </Card.Header>

      <Card.Body className="d-flex flex-column p-3 overflow-auto custom-scrollbar" style={{maxHeight: '600px'}}>
        {productosCuenta.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted my-5 py-5">
            <span className="display-4 mb-3">🍽️</span>
            <p className="fw-medium">La cuenta está vacía</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {productosCuenta.map((producto) => (
              <ProductoItem 
                key={producto.id} 
                producto={producto} 
                onAumentar={onAumentar} 
                onReducir={onReducir} 
                onEliminarFila={onEliminarFila} 
                isLibre={isLibre} 
              />
            ))}
          </ListGroup>
        )}
      </Card.Body>

      <Card.Footer className="bg-light border-top p-4 mt-auto z-1 shadow-sm">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <span className="text-secondary text-uppercase small fw-bold tracking-wider">Total a Pagar</span>
          <span className="fs-1 fw-black text-primary lh-1">
            ${totalCuenta.toFixed(2)}
          </span>
        </div>

        <div className="d-flex flex-column gap-2">
          {!isLibre && (
             <Button 
               variant="outline-primary"
               onClick={onAgregarProducto}
               className="w-100 py-3 fw-bold shadow-sm d-flex justify-content-center align-items-center gap-2 border-2 hover-transform"
             >
               <Plus className="w-5 h-5"/> Añadir Producto Múltiple
             </Button>
          )}
          <Button 
            variant="primary"
            onClick={onCerrarCuenta}
            disabled={productosCuenta.length === 0 || isLibre}
            className="w-100 py-3 fw-bold shadow-sm hover-transform fs-5"
          >
            Cobrar Cuenta
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
