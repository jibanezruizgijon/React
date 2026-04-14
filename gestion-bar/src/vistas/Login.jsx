import { useState } from 'react';
import { validarAcceso } from '../servicios/api';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contextos/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length > 0) {
      verificarPin(pin);
    }
  };

  const verificarPin = async (codigo) => {
    setCargando(true);
    try {
      const usuario = await validarAcceso(codigo);
      login(usuario);
    } catch (err) {
      setError(err.message || 'Código incorrecto. Inténtelo de nuevo.');
      setPin('');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex flex-column justify-content-center align-items-center p-3 p-md-4">
      <Card className="shadow-lg p-4 p-md-5 mx-auto login-card rounded-24">
        <div className="text-center mb-5">
          <h1 className="h2 fw-bold text-dark mb-2">
            Acceso<span className="text-primary">Personal</span>
          </h1>
          <p className="text-secondary fw-medium">Introduzca su credencial para continuar</p>
        </div>

        {error && (
          <Alert variant="danger" className="text-center fw-bold py-2 mb-4 shadow-sm border-0">
            {error}
          </Alert>
        )}

        {cargando && (
          <div className="text-primary text-center fw-bold mb-4">
            <Spinner animation="border" size="sm" className="me-2" />
            Verificando credencial...
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-secondary">Contraseña / PIN</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              disabled={cargando}
              autoFocus
              className="py-3 fs-5"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={cargando || !pin}
            className="w-100 py-3 fw-bold fs-5 shadow-sm rounded-16"
          >
            Acceder
          </Button>
        </Form>
      </Card>
    </div>
  );
}
