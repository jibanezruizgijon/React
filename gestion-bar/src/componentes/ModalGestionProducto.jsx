import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';

export default function ModalGestionProducto({ show, onHide, onSave, onDelete, producto }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: ''
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const isEditMode = !!producto;

  useEffect(() => {
    if (show) {
      if (producto) {
        setFormData({
          nombre: producto.nombre || '',
          categoria: producto.categoria || '',
          precio: producto.precio || '',
          stock: producto.stock || ''
        });
      } else {
        setFormData({
          nombre: '',
          categoria: '',
          precio: '',
          stock: ''
        });
      }
      setShowConfirmDelete(false);
    }
  }, [show, producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...producto,
      nombre: formData.nombre,
      categoria: formData.categoria,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock, 10)
    });
  };

  if (showConfirmDelete) {
    return (
      <Modal show={show} onHide={() => setShowConfirmDelete(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="fw-bold fs-5">Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center">
          <Trash2 className="text-danger mb-3" size={48} />
          <h4 className="fw-bold mb-3">¿Estás seguro?</h4>
          <p className="text-muted mb-0">
            ¿Deseas eliminar el producto <strong>{producto?.nombre}</strong>? Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={() => setShowConfirmDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" className="fw-bold px-4" onClick={() => onDelete(producto.id)}>
            Sí, Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold text-primary">
          {isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Cerveza Mahou"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Bebidas, Tapas..."
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Precio (€)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Stock Actual</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  placeholder="Cantidad en almacén"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        
        <Modal.Footer className="bg-light justify-content-between">
          <div>
            {isEditMode && (
              <Button 
                variant="outline-danger" 
                className="d-flex align-items-center gap-2"
                onClick={() => setShowConfirmDelete(true)}
              >
                <Trash2 size={18} /> Eliminar
              </Button>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={onHide}>
              Volver
            </Button>
            <Button variant="primary" type="submit" className="fw-bold px-4">
              Confirmar
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
