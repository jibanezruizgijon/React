import { Link } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import ModalAlergenos from '../../componentes/comunes/ModalAlergenos';
import { useState } from 'react';

export default function ClienteHome() {
  const [showAlergenos, setShowAlergenos] = useState(false);

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="bg-primary text-white text-center py-4 shadow-sm">
        <h1 className="h4 fw-bold m-0">Nombre del restaurante</h1>
      </header>

      <Container className="flex-grow-1 d-flex flex-column justify-content-center p-4 gap-4 max-w-md mx-auto mw-500">
        <Link to="/carta" className="text-decoration-none">
          <Card className="border-0 shadow-sm text-center py-5 hover-transform bg-soft-blue rounded-16">
            <Card.Body>
              <h2 className="text-dark m-0 fw-normal">Ver carta</h2>
            </Card.Body>
          </Card>
        </Link>

        <Link to="/reserva" className="text-decoration-none">
          <Card className="border-0 shadow-sm text-center py-5 hover-transform bg-soft-blue rounded-16">
            <Card.Body>
              <h2 className="text-dark m-0 fw-normal">Reserva de Mesa</h2>
            </Card.Body>
          </Card>
        </Link>
      </Container>

      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <p className="m-0 mb-1">Número tlf: 688461344</p>
        <Button variant="link" className="text-white text-decoration-none p-0 m-0" onClick={() => setShowAlergenos(true)}>
          Enlace Alergenos
        </Button>
      </footer>

      <ModalAlergenos show={showAlergenos} onHide={() => setShowAlergenos(false)} />
    </div>
  );
}
