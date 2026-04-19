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
  const [errores, setErrores] = useState({});
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
    let { name, value, type, checked } = e.target;

    // Control estricto a medida que el usuario escribe
    if (name === 'telefono') {
      // Eliminar cualquier caracter que no sea numérico
      value = value.replace(/\D/g, '');
      // Limitar a un máximo de 9 dígitos españoles
      if (value.length > 9) value = value.slice(0, 9);
    } else if (name === 'pin') {
      // Eliminar cualquier caracter que no sea numérico
      value = value.replace(/\D/g, '');
      // Limitar a 4 dígitos
      if (value.length > 4) value = value.slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
    // Limpiar el error cuando el usuario empieza a escribir en el campo
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre no puede estar vacío';
    }
    
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono no puede estar vacío';
    } else if (!/^\d+$/.test(formData.telefono)) {
      nuevosErrores.telefono = 'Solo puede contener números';
    } else if (formData.telefono.length < 9) {
      nuevosErrores.telefono = 'Mínimo 9 dígitos';
    }

    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo no puede estar vacío';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      nuevosErrores.correo = 'Formato de correo inválido';
    }

    if (!formData.pin.trim()) {
      nuevosErrores.pin = 'El PIN no puede estar vacío';
    } else if (!/^\d{4}$/.test(formData.pin)) {
      nuevosErrores.pin = 'Debe ser de 4 números';
    }

    setErrores(nuevosErrores);
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
          <Form onSubmit={manejarEnvio} noValidate>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-end mb-1">
                <Form.Label className="fw-semibold small m-0">Nombre:</Form.Label>
                {errores.nombre && <span className="text-warning small fw-bold px-2 py-1 bg-warning bg-opacity-25 rounded">{errores.nombre}</span>}
              </div>
              <Form.Control 
                type="text" name="nombre" value={formData.nombre} onChange={manejarCambio}
                className={`py-2 border-0 shadow-sm ${errores.nombre ? 'border border-warning' : ''}`}
                style={errores.nombre ? {boxShadow: '0 0 0 2px #ffc107'} : {}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-end mb-1">
                <Form.Label className="fw-semibold small m-0">Teléfono:</Form.Label>
                {errores.telefono && <span className="text-warning small fw-bold px-2 py-1 bg-warning bg-opacity-25 rounded">{errores.telefono}</span>}
              </div>
              <Form.Control 
                type="text" name="telefono" value={formData.telefono} onChange={manejarCambio}
                className={`py-2 border-0 shadow-sm ${errores.telefono ? 'border border-warning' : ''}`}
                style={errores.telefono ? {boxShadow: '0 0 0 2px #ffc107'} : {}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-end mb-1">
                <Form.Label className="fw-semibold small m-0">Correo:</Form.Label>
                {errores.correo && <span className="text-warning small fw-bold px-2 py-1 bg-warning bg-opacity-25 rounded">{errores.correo}</span>}
              </div>
              <Form.Control 
                type="email" name="correo" value={formData.correo} onChange={manejarCambio}
                className={`py-2 border-0 shadow-sm ${errores.correo ? 'border border-warning' : ''}`}
                style={errores.correo ? {boxShadow: '0 0 0 2px #ffc107'} : {}}
              />
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
                    {errores.pin && <span className="text-warning small fw-bold px-2 py-1 bg-warning bg-opacity-25 rounded">{errores.pin}</span>}
                  </div>
                  <Form.Control 
                    type="text" name="pin" value={formData.pin} onChange={manejarCambio} maxLength={4}
                    className={`py-2 border-0 shadow-sm font-monospace text-center fw-bold ${errores.pin ? 'border border-warning' : ''}`}
                    style={errores.pin ? {boxShadow: '0 0 0 2px #ffc107'} : {}}
                  />
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
    </div>
  );
}
