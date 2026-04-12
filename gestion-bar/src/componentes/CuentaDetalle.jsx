import { memo } from 'react';
import { Card, Button, Badge, ListGroup } from 'react-bootstrap';

const ProductoItem = memo(({ producto }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-0 bg-light rounded mb-2 shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <Badge bg="primary" pill className="px-2 py-2 fs-6 shadow-sm">
          {producto.cantidad}x
        </Badge>
        <div>
          <span className="fw-bold text-dark d-block">{producto.nombre}</span>
          <span className="text-secondary small d-block">${producto.precio.toFixed(2)} c/u</span>
        </div>
      </div>
      <span className="fw-bold text-dark fs-5">
        ${(producto.precio * producto.cantidad).toFixed(2)}
      </span>
    </ListGroup.Item>
  );
});
ProductoItem.displayName = "ProductoItem";

export default function CuentaDetalle({ mesaSeleccionada, productosCuenta, onAgregarProducto, onCerrarCuenta }) {
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
    <Card className="h-100 shadow-sm border-0 d-flex flex-column">
      <Card.Header className="bg-white border-bottom p-4 d-flex justify-content-between align-items-start">
        <div>
          <h2 className="h4 fw-bold text-dark mb-1">Detalle de Cuenta</h2>
          <p className="text-secondary mb-0 fw-medium">Mesa {mesaSeleccionada.nMesa || mesaSeleccionada.numero}</p>
        </div>
        <Badge 
          bg={isOcupada ? 'danger' : 'secondary'} 
          className="text-uppercase px-3 py-2 rounded-pill"
        >
          {mesaSeleccionada.estado}
        </Badge>
      </Card.Header>

      <Card.Body className="d-flex flex-column p-4 overflow-auto custom-scrollbar">
        {productosCuenta.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
            <span className="display-4 mb-3">🍽️</span>
            <p>La cuenta está vacía</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {productosCuenta.map((producto) => (
              <ProductoItem key={producto.id} producto={producto} />
            ))}
          </ListGroup>
        )}
      </Card.Body>

      <Card.Footer className="bg-light border-top p-4 mt-auto">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <span className="text-secondary text-uppercase small fw-bold tracking-wider">Total a Pagar</span>
          <span className="fs-1 fw-bold text-primary">
            ${totalCuenta.toFixed(2)}
          </span>
        </div>

        <div className="d-flex gap-2">
          <Button 
            variant="outline-primary"
            onClick={onAgregarProducto}
            disabled={isLibre}
            className="flex-grow-1 py-3 fw-bold shadow-sm"
          >
            + Añadir Producto
          </Button>
          <Button 
            variant="primary"
            onClick={onCerrarCuenta}
            disabled={productosCuenta.length === 0 || isLibre}
            className="flex-grow-1 py-3 fw-bold shadow-sm"
          >
            Cobrar Cuenta
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
