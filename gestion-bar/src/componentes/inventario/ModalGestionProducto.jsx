import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';
import { useFormularioProducto } from '../../hooks/useFormularioProducto';
import ModalConfirmacion from '../comunes/ModalConfirmacion';
import { PickList } from 'primereact/picklist';
import { obtenerAlergenos, obtenerCategorias } from '../../servicios/api';

export default function ModalGestionProducto({ show, onHide, onSave, onDelete, producto }) {
  const { formData, errores, touched, handleChange, validarFormulario, resetForm, setAlergenos } = useFormularioProducto();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sourceAlergenos, setSourceAlergenos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const isEditMode = !!producto;

  const fetchAlergenos = async (targetList) => {
    try {
      const data = await obtenerAlergenos();
      const targetIds = targetList.map(a => a.id);
      const available = data.filter(a => !targetIds.includes(a.id));
      setSourceAlergenos(available);
    } catch (err) {
      console.error('Failed to fetch alergenos', err);
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (err) {
      console.error('Failed to fetch categorias', err);
    }
  };

  useEffect(() => {
    if (show) {
      resetForm(producto);
      setShowConfirmDelete(false);
      fetchAlergenos(producto?.alergenos || []);
      fetchCategorias();
    }
  }, [show, producto, resetForm]);

  const handlePickListChange = (e) => {
    setSourceAlergenos(e.source);
    setAlergenos(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onSave({
        ...producto,
        nombre: formData.nombre,
        categoria: formData.categoria,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock, 10),
        alergenos: formData.alergenos
      });
    }
  };

  const handleConfirmDelete = () => {
    onDelete(producto.id);
    setShowConfirmDelete(false);
  };

  if (showConfirmDelete) {
    return (
      <ModalConfirmacion
        show={show}
        onHide={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        itemName={`el producto ${producto?.nombre}`}
      />
    );
  }

  const alergenoTemplate = (item) => {
    return (
      <div className="p-2 border-bottom">
        <span className="fw-semibold">{item.nombre}</span>
      </div>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold text-primary">
          {isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="g-4">
            <Col md={5}>
              <Row className="g-3">
                <Col md={12}>
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
                      maxLength={100}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Categoría</Form.Label>
                    <Form.Select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      isInvalid={touched.categoria && !!errores.categoria}
                      style={{ borderColor: touched.categoria && errores.categoria ? 'red' : '' }}
                    >
                      <option value="">-- Selecciona una categoría --</option>
                      {categorias.map(cat => (
                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errores.categoria}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Precio (€)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      max="9999.99"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      onKeyDown={(e) => ['e', 'E', '+'].includes(e.key) && e.preventDefault()}
                      isInvalid={touched.precio && !!errores.precio}
                      style={{ borderColor: touched.precio && errores.precio ? 'red' : '' }}
                      placeholder="0.00"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.precio}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Stock Actual</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="9999"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      onKeyDown={(e) => ['e', 'E', '+', '.'].includes(e.key) && e.preventDefault()}
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
            </Col>

            <Col md={7}>
              <Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="fw-semibold m-0">Gestión de Alérgenos</Form.Label>
                </div>

                <PickList
                  source={sourceAlergenos}
                  target={formData.alergenos}
                  itemTemplate={alergenoTemplate}
                  sourceHeader="Disponibles"
                  targetHeader="Seleccionados"
                  sourceStyle={{ height: '300px' }}
                  targetStyle={{ height: '300px' }}
                  onChange={handlePickListChange}
                  dataKey="id"
                  showSourceControls={false}
                  showTargetControls={false}
                  className="mt-3"
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
