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
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
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
      setErrores({});
      setTouched({});
      setShowConfirmDelete(false);
    }
  }, [show, producto]);

  const validarCampo = (name, value) => {
    let error = null;
    const valString = String(value);

    if (name === 'nombre' && valString.trim() === '') {
      error = 'El nombre es obligatorio';
    } else if (name === 'categoria' && valString.trim() === '') {
      error = 'La categoría es obligatoria';
    } else if (name === 'precio') {
      if (valString === '') error = 'El precio es obligatorio';
      else if (parseFloat(valString) < 0) error = 'El precio no puede ser negativo';
    } else if (name === 'stock') {
      if (valString === '') error = 'El stock es obligatorio';
      else if (parseInt(valString, 10) < 0) error = 'El stock no puede ser negativo';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Marcar como tocado
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar con cada cambio de letra
    const error = validarCampo(name, value);
    setErrores(prev => ({
      ...prev,
      [name]: error
    }));

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const nombresCampos = ['nombre', 'categoria', 'precio', 'stock'];
    
    nombresCampos.forEach(campo => {
      const error = validarCampo(campo, formData[campo]);
      if (error) nuevosErrores[campo] = error;
    });
    
    setErrores(nuevosErrores);
    setTouched({
      nombre: true, categoria: true, precio: true, stock: true
    });
    
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onSave({
        ...producto,
        nombre: formData.nombre,
        categoria: formData.categoria,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock, 10)
      });
    }
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
                  isInvalid={touched.nombre && !!errores.nombre}
                  style={{ borderColor: touched.nombre && errores.nombre ? 'red' : '' }}
                  placeholder="Ej. Cerveza Mahou"
                />
                <Form.Control.Feedback type="invalid">
                  {errores.nombre}
                </Form.Control.Feedback>
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
                  isInvalid={touched.categoria && !!errores.categoria}
                  style={{ borderColor: touched.categoria && errores.categoria ? 'red' : '' }}
                  placeholder="Ej. Bebidas, Tapas..."
                />
                <Form.Control.Feedback type="invalid">
                  {errores.categoria}
                </Form.Control.Feedback>
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
                  isInvalid={touched.precio && !!errores.precio}
                  style={{ borderColor: touched.precio && errores.precio ? 'red' : '' }}
                  placeholder="0.00"
                />
                <Form.Control.Feedback type="invalid">
                  {errores.precio}
                </Form.Control.Feedback>
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
                  isInvalid={touched.stock && !!errores.stock}
                  style={{ borderColor: touched.stock && errores.stock ? 'red' : '' }}
                  placeholder="Cantidad en almacén"
                />
                <Form.Control.Feedback type="invalid">
                  {errores.stock}
                </Form.Control.Feedback>
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
