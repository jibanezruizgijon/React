import { Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import ProductoItem from './ProductoItem';

export default function CuentaDetalle({ mesaSeleccionada, productosCuenta, onAgregarProducto, onCerrarCuenta, onAumentar, onReducir, onEliminarFila }) {
  if (!mesaSeleccionada) {
    return (
      <Card className="h-100 border-dashed-2 bg-light d-flex align-items-center justify-content-center text-muted p-5 text-center min-vh-50 rounded-4">
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

      <Card.Body className="d-flex flex-column p-3 overflow-auto custom-scrollbar mh-600">
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
