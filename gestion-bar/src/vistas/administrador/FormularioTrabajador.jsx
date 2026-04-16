import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import { obtenerPersonal, agregarPersonal, actualizarPersonal, eliminarPersonal } from '../../servicios/api';
import { Card, Form, Button, Spinner, Row, Col } from 'react-bootstrap';

export default function FormularioTrabajador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = id !== undefined;

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    rol: 'Camarero',
    estado: 1,
    pin: ''
  });
  const [cargando, setCargando] = useState(esEdicion);

  useEffect(() => {
    if (esEdicion) {
      obtenerPersonal().then(data => {
        const trabajador = data.find(t => t.id === Number(id));
        if (trabajador) setFormData(trabajador);
        setCargando(false);
      });
    }
  }, [id, esEdicion]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);
    if (esEdicion) {
      await actualizarPersonal(formData);
    } else {
      await agregarPersonal(formData);
    }
    navigate('/admin/trabajadores');
  };

  const manejarEliminar = async () => {
    if (confirm('¿Está seguro de eliminar este trabajador?')) {
      await eliminarPersonal(formData.id);
      navigate('/admin/trabajadores');
    }
  };

  if (cargando && esEdicion) return (
    <div className="text-center p-5 text-primary">
      <Spinner animation="border" />
      <div className="mt-3 fw-bold">Cargando datos...</div>
    </div>
  );

  return (
    <div className="mx-auto align-middle mw-600">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="light" onClick={() => navigate('/admin/trabajadores')} className="">
          <ArrowLeft className="w-5 h-5 text-dark" />
        </Button>
        <h2 className="h4 fw-bold text-dark m-0">
          {esEdicion ? 'Gestión del Trabajador' : 'Añadir Trabajador'}
        </h2>
      </div>

      <Card className="bg-primary text-white border-0 shadow-lg p-3 p-md-4 rounded-4 position-relative overflow-hidden">
        <Card.Body className="position-relative z-1">
          <Form onSubmit={manejarEnvio}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Nombre:</Form.Label>
              <Form.Control 
                required type="text" name="nombre" value={formData.nombre} onChange={manejarCambio}
                className="py-2 border-0 shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Teléfono:</Form.Label>
              <Form.Control 
                required type="text" name="telefono" value={formData.telefono} onChange={manejarCambio}
                className="py-2 border-0 shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Correo:</Form.Label>
              <Form.Control 
                required type="email" name="correo" value={formData.correo} onChange={manejarCambio}
                className="py-2 border-0 shadow-sm"
              />
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col sm={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold small">Rol:</Form.Label>
                  <Form.Select 
                    name="rol" value={formData.rol} onChange={manejarCambio}
                    className="py-2 border-0 shadow-sm"
                  >
                    <option value="Camarero">Camarero</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Cocinero">Cocinero</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold small">PIN de Acceso:</Form.Label>
                  <Form.Control 
                    required type="text" name="pin" value={formData.pin} onChange={manejarCambio} maxLength={4}
                    className="py-2 border-0 shadow-sm font-monospace text-center fw-bold"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Check 
                type="checkbox" 
                id="estado-checkbox"
                name="estado" 
                checked={formData.estado === 1} 
                onChange={manejarCambio}
                label="Estado (Alta)"
                className="fw-semibold"
              />
            </Form.Group>

            <div className="d-flex flex-column gap-3 mt-4">
              <Button 
                type="submit" variant="dark" disabled={cargando}
                className="w-100 py-3 fw-bold rounded-3 shadow-sm d-flex justify-content-center align-items-center gap-2"
              >
                <Save className="w-5 h-5" /> Confirmar
              </Button>
              
              {esEdicion && (
                <Button 
                  type="button" variant="danger" disabled={cargando} onClick={manejarEliminar}
                  className="w-100 py-3 fw-bold rounded-3 shadow-sm d-flex justify-content-center align-items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" /> Eliminar
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
