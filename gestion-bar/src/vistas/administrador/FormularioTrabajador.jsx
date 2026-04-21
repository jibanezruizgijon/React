import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import { obtenerPersonal, agregarPersonal, actualizarPersonal, eliminarPersonal } from '../../servicios/api';
import { Card, Form, Button, Spinner, Row, Col, Modal } from 'react-bootstrap';

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
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
  const [cargando, setCargando] = useState(esEdicion);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  useEffect(() => {
    if (esEdicion) {
      obtenerPersonal().then(data => {
        const trabajador = data.find(t => t.id === Number(id));
        if (trabajador) setFormData(trabajador);
        setCargando(false);
      });
    }
  }, [id, esEdicion]);

  const validarCampo = (name, value) => {
    let error = null;
    const valString = String(value);

    if (name === 'nombre' && !valString.trim()) {
      error = 'El nombre no puede estar vacío';
    } else if (name === 'telefono') {
      if (!valString.trim()) {
        error = 'El teléfono no puede estar vacío';
      } else if (!/^\d+$/.test(valString)) {
        error = 'Solo puede contener números';
      } else if (valString.length < 9) {
        error = 'Mínimo 9 dígitos';
      }
    } else if (name === 'correo') {
      if (!valString.trim()) {
        error = 'El correo no puede estar vacío';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valString)) {
        error = 'Formato de correo inválido';
      }
    } else if (name === 'pin') {
      if (!valString.trim()) {
        error = 'El PIN no puede estar vacío';
      } else if (!/^\d{4}$/.test(valString)) {
        error = 'Debe ser de 4 números';
      }
    }
    return error;
  };

  const manejarCambio = (e) => {
    let { name, value, type, checked } = e.target;

    // Control estricto a medida que el usuario escribe
    if (name === 'telefono') {
      value = value.replace(/\D/g, '');
      if (value.length > 9) value = value.slice(0, 9);
    } else if (name === 'pin') {
      value = value.replace(/\D/g, '');
      if (value.length > 4) value = value.slice(0, 4);
    }

    const valToSave = type === 'checkbox' ? (checked ? 1 : 0) : value;

    // Marcar como tocado
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validar con cada cambio
    const error = validarCampo(name, valToSave);
    setErrores(prev => ({
      ...prev,
      [name]: error
    }));

    setFormData(prev => ({
      ...prev,
      [name]: valToSave
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const nombresCampos = ['nombre', 'telefono', 'correo', 'pin'];
    
    nombresCampos.forEach(campo => {
      const error = validarCampo(campo, formData[campo]);
      if (error) nuevosErrores[campo] = error;
    });

    setErrores(nuevosErrores);
    setTouched({
      nombre: true, telefono: true, correo: true, pin: true
    });
    
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    
    setCargando(true);
    if (esEdicion) {
      await actualizarPersonal(formData);
    } else {
      await agregarPersonal(formData);
    }
    navigate('/admin/trabajadores');
  };

  const manejarEliminar = () => {
    setMostrarModalEliminar(true);
  };

  const confirmarEliminar = async () => {
    setCargando(true);
    await eliminarPersonal(formData.id);
    navigate('/admin/trabajadores');
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
          <Form onSubmit={manejarEnvio} noValidate>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-end mb-1">
                <Form.Label className="fw-semibold small m-0">Nombre:</Form.Label>
              </div>
              <Form.Control 
                type="text" name="nombre" value={formData.nombre} onChange={manejarCambio}
                isInvalid={touched.nombre && !!errores.nombre}
                style={{ borderColor: touched.nombre && errores.nombre ? 'red' : '' }}
                className="py-2 shadow-sm"
              />
              <Form.Control.Feedback type="invalid" className="fw-bold bg-danger bg-opacity-75 text-white px-2 py-1 rounded mt-1">
                {errores.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-end mb-1">
                <Form.Label className="fw-semibold small m-0">Teléfono:</Form.Label>
              </div>
              <Form.Control 
                type="text" name="telefono" value={formData.telefono} onChange={manejarCambio}
                isInvalid={touched.telefono && !!errores.telefono}
                style={{ borderColor: touched.telefono && errores.telefono ? 'red' : '' }}
                className="py-2 shadow-sm"
              />
              <Form.Control.Feedback type="invalid" className="fw-bold bg-danger bg-opacity-75 text-white px-2 py-1 rounded mt-1">
                {errores.telefono}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-end mb-1">
                <Form.Label className="fw-semibold small m-0">Correo:</Form.Label>
              </div>
              <Form.Control 
                type="email" name="correo" value={formData.correo} onChange={manejarCambio}
                isInvalid={touched.correo && !!errores.correo}
                style={{ borderColor: touched.correo && errores.correo ? 'red' : '' }}
                className="py-2 shadow-sm"
              />
              <Form.Control.Feedback type="invalid" className="fw-bold bg-danger bg-opacity-75 text-white px-2 py-1 rounded mt-1">
                {errores.correo}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col sm={6}>
                <Form.Group>
                  <div className="d-flex justify-content-between align-items-end mb-1">
                    <Form.Label className="fw-semibold small m-0">Rol:</Form.Label>
                  </div>
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
                  <div className="d-flex justify-content-between align-items-end mb-1">
                    <Form.Label className="fw-semibold small m-0">PIN de Acceso:</Form.Label>
                  </div>
                  <Form.Control 
                    type="text" name="pin" value={formData.pin} onChange={manejarCambio} maxLength={4}
                    isInvalid={touched.pin && !!errores.pin}
                    style={{ borderColor: touched.pin && errores.pin ? 'red' : '' }}
                    className="py-2 shadow-sm font-monospace text-center fw-bold"
                  />
                  <Form.Control.Feedback type="invalid" className="fw-bold bg-danger bg-opacity-75 text-white px-2 py-1 rounded mt-1">
                    {errores.pin}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4 mt-3">
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

      <Modal show={mostrarModalEliminar} onHide={() => setMostrarModalEliminar(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="fw-bold fs-5">Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center">
          <Trash2 className="text-danger mb-3" size={48} />
          <h4 className="fw-bold mb-3">¿Estás seguro?</h4>
          <p className="text-muted mb-0">
            ¿Deseas eliminar al trabajador <strong>{formData.nombre}</strong>? Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={() => setMostrarModalEliminar(false)} disabled={cargando}>
            Cancelar
          </Button>
          <Button variant="danger" className="fw-bold px-4" onClick={confirmarEliminar} disabled={cargando}>
            Sí, Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
