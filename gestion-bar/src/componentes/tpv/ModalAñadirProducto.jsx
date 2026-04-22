import { useState, useEffect } from 'react';
import { Modal, Button, Form, Tabs, Tab, Spinner, InputGroup } from 'react-bootstrap';
import { obtenerProductos } from '../../servicios/api';

export default function ModalAñadirProducto({ show, onHide, onAdd }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSelecta, setCategoriaSelecta] = useState('');
  const [productoSelecto, setProductoSelecto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (show) {
      cargarProductos();
    } else {
      // Reset state on close
      setProductoSelecto(null);
      setCantidad(1);
    }
  }, [show]);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const data = await obtenerProductos();
      setProductos(data);
      if (data.length > 0) {
        setCategoriaSelecta(data[0].categoria);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const categorias = [...new Set(productos.map(p => p.categoria))];

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (productoSelecto && cantidad > 0) {
      onAdd(productoSelecto, cantidad);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold text-primary">Añadir Producto a la Cuenta</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        {cargando ? (
          <div className="d-flex justify-content-center p-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Form id="form-add-product" onSubmit={manejarEnvio}>
            <Tabs
              activeKey={categoriaSelecta}
              onSelect={(k) => { setCategoriaSelecta(k); setProductoSelecto(null); }}
              className="mb-4 custom-tabs"
              fill
              variant="pills"
            >
              {categorias.map(cat => (
                <Tab eventKey={cat} title={cat} key={cat}>
                  <div className="grid-auto-200">
                    {productos.filter(p => p.categoria === cat).map(p => (
                      <Button
                        key={p.id}
                        variant={productoSelecto?.id === p.id ? "primary" : "outline-secondary"}
                        className="p-3 text-start h-100 shadow-sm border border-2"
                        onClick={() => setProductoSelecto(p)}
                      >
                        <div className="fw-bold text-truncate">{p.nombre}</div>
                        <div className={productoSelecto?.id === p.id ? "text-light" : "text-primary fw-semibold"}>
                          ${p.precio.toFixed(2)}
                        </div>
                      </Button>
                    ))}
                  </div>
                </Tab>
              ))}
            </Tabs>

            {productoSelecto && (
              <div className="mt-4 p-4 bg-light rounded border border-primary d-flex align-items-center justify-content-between shadow-sm">
                <div>
                  <h5 className="mb-1 fw-bold">{productoSelecto.nombre}</h5>
                  <div className="text-secondary">Precio unitario: ${productoSelecto.precio.toFixed(2)}</div>
                </div>
                <div className="mw-150 w-100">
                  <Form.Label className="small fw-bold text-uppercase mb-1">Cantidad</Form.Label>
                  <InputGroup>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                      className="text-center fw-bold text-primary"
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setCantidad(cantidad + 1)}
                    >
                      +
                    </Button>
                  </InputGroup>
                </div>
              </div>
            )}
          </Form>
        )}
      </Modal.Body>
      
      <Modal.Footer className="bg-light">
        <Button variant="outline-secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          type="submit" 
          form="form-add-product"
          disabled={!productoSelecto || cantidad < 1}
          className="fw-bold px-4"
        >
          Añadir {productoSelecto && `(${cantidad})`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
