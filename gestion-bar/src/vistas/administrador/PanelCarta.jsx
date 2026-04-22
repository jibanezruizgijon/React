import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../../servicios/api';
import { Card, Row, Col, Button, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import ModalGestionProducto from '../../componentes/inventario/ModalGestionProducto';
import ProductoCarta from '../../componentes/inventario/ProductoCarta';

export default function PanelCarta() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);

  const cargarDatos = () => {
    obtenerProductos().then(data => {
      setProductos(data);
      setCargando(false);
    });
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleGuardarProducto = async (producto) => {
    try {
      if (producto.id) {
        await actualizarProducto(producto.id, producto);
      } else {
        await crearProducto(producto);
      }
      setShowModal(false);
      cargarDatos();
    } catch (e) {
      console.error(e);
      setMensajeError("Hubo un problema al guardar el producto. Inténtalo de nuevo.");
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await eliminarProducto(id);
      setShowModal(false);
      cargarDatos();
    } catch (e) {
      console.error(e);
      setMensajeError("Hubo un problema al eliminar el producto. Inténtalo de nuevo.");
    }
  };

  if (cargando && productos.length === 0) return (
    <div className="text-center p-5 text-primary">
      <Spinner animation="border" />
      <div className="mt-3 fw-bold">Cargando carta...</div>
    </div>
  );

  return (
    <div className="d-flex flex-column gap-4 pb-5 position-relative">
      
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050, position: 'fixed' }}>
        <Toast show={!!mensajeError} onClose={() => setMensajeError(null)} delay={5000} autohide bg="danger">
          <Toast.Header>
            <strong className="me-auto">Error de Sistema</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{mensajeError}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Card className="border-0 shadow-sm p-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <div>
            <h2 className="fs-3 fw-black text-dark mb-1">Menú del Restaurante</h2>
            <p className="text-secondary small fw-medium mb-0">Gestione los platos y bebidas ofrecidos</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => { setProductoEdit(null); setShowModal(true); }} 
            className="fw-bold px-4 py-3 d-flex align-items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-5 h-5" /> Nuevo Producto
          </Button>
        </div>
      </Card>

      <Row xs={1} md={2} xl={3} className="g-4">
        {productos.map(p => (
          <Col key={p.id}>
            <ProductoCarta 
              producto={p} 
              onEdit={(prod) => { setProductoEdit(prod); setShowModal(true); }} 
            />
          </Col>
        ))}
      </Row>
      
      <div className="text-center pt-4">
        <Button variant="dark" size="lg" className="px-5 fw-bold shadow-lg rounded-pill">
          Finalizar Edición
        </Button>
      </div>

      <ModalGestionProducto
        show={showModal}
        onHide={() => setShowModal(false)}
        producto={productoEdit}
        onSave={handleGuardarProducto}
        onDelete={handleEliminarProducto}
      />
    </div>
  );
}
