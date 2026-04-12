import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ClienteReserva() {
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [datos, setDatos] = useState({
    fecha: '',
    hora: '',
    personas: '2',
    nombre: '',
    contacto: ''
  });

  const [errores, setErrores] = useState({});

  // Obtenemos la fecha de hoy para min
  const hoy = new Date();
  // Formato YYYY-MM-DD
  const minFecha = hoy.toISOString().split('T')[0];

  const generarHorasDisponibles = () => {
    // Si la fecha elegida es hoy y ya han pasado las 14:00, no dejar reservar comida, etc.
    // Lógica rápida: horas de servicio 13:00 - 16:00 y 20:00 - 23:00
    const horas = [
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
    ];

    if (!datos.fecha) return horas;
    
    // Solo permitimos horas futuras si es hoy
    if (datos.fecha === minFecha) {
      const horaActual = hoy.getHours();
      const minActual = hoy.getMinutes();
      
      return horas.filter(h => {
        const [horaStr, minStr] = h.split(':');
        const hInt = parseInt(horaStr);
        const mInt = parseInt(minStr);
        if (hInt > horaActual) return true;
        if (hInt === horaActual && mInt > minActual) return true;
        return false;
      });
    }

    return horas;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    if (!datos.fecha) nuevosErrores.fecha = 'Selecciona una fecha';
    if (!datos.hora) nuevosErrores.hora = 'Selecciona una hora';
    if (!datos.nombre) nuevosErrores.nombre = 'Obligatorio';
    if (!datos.contacto) nuevosErrores.contacto = 'Obligatorio';
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
    } else {
      // Simular guardado
      setReservaConfirmada(true);
    }
  };

  if (reservaConfirmada) {
    return (
      <div className="min-vh-100 d-flex flex-column bg-light pb-5">
        <header className="bg-primary text-white text-center py-4 shadow-sm mb-4">
          <h1 className="h4 fw-bold m-0">Nombre del restaurante</h1>
        </header>

        <Container className="max-w-md mx-auto d-flex flex-column align-items-center" style={{ maxWidth: '400px' }}>
          <Card className="border-0 shadow-sm w-100 text-center py-5 px-3 mb-4 rounded-4" style={{ backgroundColor: '#e2edff' }}>
             <div className="mx-auto mb-3 text-success border border-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px'}}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} width="32" height="32">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
             </div>
             <h2 className="h3 fw-bold text-dark mb-2">¡Reserva<br/>Confirmada!</h2>
             <p className="text-secondary small mb-4">Tu mesa ha sido reservada exitosamente</p>
             
             <Card className="border-0 bg-white mb-4 shadow-sm w-auto d-inline-block mx-auto px-4 py-3 rounded-3">
                <span className="d-block small text-secondary">Número de confirmación</span>
                <span className="fw-black fs-5 text-dark">#BR-2024-{Math.floor(Math.random() * 9000) + 1000}</span>
             </Card>

             <div className="text-start bg-light p-3 rounded-3 shadow-sm mx-2 mb-4">
               <strong className="d-block text-dark">Casa de paco</strong>
               <small className="text-secondary">Calle falsa 81</small>
               
               <div className="d-flex align-items-center mt-3 gap-3">
                 <div>
                   <span className="d-block fw-bold text-dark">Día</span>
                   <small className="text-secondary">{datos.fecha}</small>
                 </div>
                 <div>
                   <span className="d-block fw-bold text-dark">Hora</span>
                   <small className="text-secondary">{datos.hora}</small>
                 </div>
                 <div>
                   <span className="d-block fw-bold text-dark">Personas</span>
                   <small className="text-secondary">{datos.personas}</small>
                 </div>
               </div>
             </div>

             <div className="d-grid gap-2 px-2">
                <Button variant="light" className="fw-bold bg-white shadow-sm border-0 py-2 rounded-pill">
                  Añadir al Calendario
                </Button>
                <Button as={Link} to="/" variant="light" className="fw-bold bg-white shadow-sm border-0 py-2 rounded-pill">
                  Volver Inicio
                </Button>
             </div>
          </Card>
        </Container>
      </div>
    );
  }

  const horasDisponibles = generarHorasDisponibles();

  return (
    <div className="min-vh-100 d-flex flex-column bg-light pb-5">
      <header className="bg-primary text-white text-center py-4 shadow-sm mb-4">
        <h1 className="h4 fw-bold m-0">Nombre del restaurante</h1>
      </header>

      <Container className="max-w-md mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-4">
          <Button as={Link} to="/" variant="primary" className="rounded-pill shadow-sm py-2 px-4 fw-bold">
            Volver Inicio
          </Button>
        </div>

        <Card className="border-0 shadow-sm rounded-4" style={{ backgroundColor: '#e2edff' }}>
          <Card.Body className="p-4">
            <Form onSubmit={manejarEnvio}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-dark mb-1">Día:</Form.Label>
                <Form.Control 
                  type="date" 
                  min={minFecha}
                  className="rounded-3 py-2 border-0 shadow-sm"
                  value={datos.fecha}
                  onChange={(e) => {
                    setDatos({...datos, fecha: e.target.value, hora: ''});
                    setErrores({...errores, fecha: null});
                  }}
                  isInvalid={!!errores.fecha}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-dark mb-1">Horas Disponibles:</Form.Label>
                <Form.Select 
                  className="rounded-3 py-2 border-0 shadow-sm"
                  value={datos.hora}
                  onChange={(e) => {
                    setDatos({...datos, hora: e.target.value});
                    setErrores({...errores, hora: null});
                  }}
                  isInvalid={!!errores.hora}
                  disabled={!datos.fecha}
                >
                  <option value="">Seleccione la hora</option>
                  {horasDisponibles.length > 0 ? (
                    horasDisponibles.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))
                  ) : (
                    <option value="" disabled>No hay horas disponibles para hoy</option>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-dark mb-1">Número de personas:</Form.Label>
                <Form.Select 
                  className="rounded-3 py-2 border-0 shadow-sm w-50"
                  value={datos.personas}
                  onChange={(e) => setDatos({...datos, personas: e.target.value})}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-dark mb-1">Contacto / Nombre:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: Juan Pérez"
                  className="rounded-3 py-2 border-0 shadow-sm mb-2"
                  value={datos.nombre}
                  onChange={(e) => {
                    setDatos({...datos, nombre: e.target.value});
                    setErrores({...errores, nombre: null});
                  }}
                  isInvalid={!!errores.nombre}
                />
                <Form.Control 
                  type="email" 
                  placeholder="Correo o Teléfono"
                  className="rounded-3 py-2 border-0 shadow-sm"
                  value={datos.contacto}
                  onChange={(e) => {
                    setDatos({...datos, contacto: e.target.value});
                    setErrores({...errores, contacto: null});
                  }}
                  isInvalid={!!errores.contacto}
                />
              </Form.Group>

              <div className="d-grid mt-5">
                <Button variant="light" type="submit" className="rounded-pill bg-white shadow-sm fw-bold border-0 py-3 text-dark fs-5 hover-transform">
                  Reservar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      
      <footer className="bg-primary text-white text-center py-3 mt-auto sticky-bottom mt-5">
        <p className="m-0 mb-1">Número tlf: 688461344</p>
        <Button as={Link} to="/carta" variant="link" className="text-white text-decoration-none p-0 m-0">
          Enlace Alergenos / Carta
        </Button>
      </footer>
    </div>
  );
}
