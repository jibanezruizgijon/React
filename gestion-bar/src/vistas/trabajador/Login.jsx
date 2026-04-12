import { useState } from 'react';
import { validarAcceso } from '../../servicios/api';
import { Container, Card, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';

export default function Login({ onLoginExitoso }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarClickNumero = (numero) => {
    if (pin.length < 4) {
      const nuevoPin = pin + numero;
      setPin(nuevoPin);
      setError('');
      
      if (nuevoPin.length === 4) {
        verificarPin(nuevoPin);
      }
    }
  };

  const manejarBorrar = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  const verificarPin = async (codigo) => {
    setCargando(true);
    try {
      const usuario = await validarAcceso(codigo);
      onLoginExitoso(usuario);
    } catch (err) {
      setError(err.message || 'Código incorrecto. Inténtelo de nuevo.');
      setPin('');
    } finally {
      setCargando(false);
    }
  };

  // Teclado numérico, disposición típica
  const numeros = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ];

  return (
    <div className="bg-dark min-vh-100 d-flex flex-column justify-content-center align-items-center p-3 p-md-4">
      <Card className="shadow-lg p-4 p-md-5 mx-auto" style={{ maxWidth: '400px', width: '100%', borderRadius: '24px' }}>
        <div className="text-center mb-5">
          <h1 className="h2 fw-bold text-dark mb-2">
            Acceso<span className="text-primary">Personal</span>
          </h1>
          <p className="text-secondary fw-medium">Introduzca su PIN para continuar</p>
        </div>

        {/* Indicadores de PIN */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className={`rounded-circle transition-all ${
                i < pin.length 
                  ? 'bg-primary' 
                  : 'bg-light border'
              } ${error ? 'bg-danger border-danger' : ''}`}
              style={{ 
                width: '18px', 
                height: '18px', 
                transform: i < pin.length ? 'scale(1.2)' : 'scale(1)' 
              }}
            />
          ))}
        </div>

        {error && (
          <Alert variant="danger" className="text-center fw-bold py-2 mb-4 shadow-sm border-0">
            {error}
          </Alert>
        )}

        {cargando && (
          <div className="text-primary text-center fw-bold mb-4">
            <Spinner animation="border" size="sm" className="me-2" />
            Verificando código...
          </div>
        )}

        {/* Teclado */}
        <div className="row g-3 mb-2 px-2">
          {numeros.flat().map((num) => (
            <div className="col-4" key={num}>
              <Button
                variant="light"
                onClick={() => manejarClickNumero(num.toString())}
                disabled={cargando}
                className="w-100 py-3 fs-3 fw-bold text-dark shadow-sm border border-light"
                style={{ borderRadius: '16px' }}
              >
                {num}
              </Button>
            </div>
          ))}
          
          <div className="col-4 ms-auto">
            <Button
              variant="light"
              onClick={() => manejarClickNumero('0')}
              disabled={cargando}
              className="w-100 py-3 fs-3 fw-bold text-dark shadow-sm border border-light"
              style={{ borderRadius: '16px' }}
            >
              0
            </Button>
          </div>

          <div className="col-4">
            <Button
              variant="danger"
              onClick={manejarBorrar}
              disabled={cargando || pin.length === 0}
              className="w-100 py-3 d-flex justify-content-center align-items-center shadow-sm border-0"
              title="Borrar"
              style={{ borderRadius: '16px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
