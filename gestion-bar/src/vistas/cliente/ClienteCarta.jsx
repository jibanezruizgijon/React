import { useState, useEffect } from 'react';
import { Container, Card, Badge, Modal, Button } from 'react-bootstrap';
import { obtenerProductos } from '../../servicios/api';
import ModalAlergenos from '../../componentes/comunes/ModalAlergenos';

export default function ClienteCarta() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showAlergenos, setShowAlergenos] = useState(false);

  useEffect(() => {
    obtenerProductos().then(data => {
      setProductos(data);
      setCargando(false);
    });
  }, []);

  if (cargando) return <div className="text-center p-5 fw-bold text-primary">Cargando la carta...</div>;

  return (
    <div className="min-vh-100 d-flex flex-column bg-light pb-5">
      <header className="bg-primary text-white text-center py-4 shadow-sm">
        <h1 className="h4 fw-bold m-0">Nombre del restaurante</h1>
      </header>
      
      <Container className="pt-3 max-w-md mx-auto mw-600">
        {/* Filtros mockup */}
        <div className="d-flex flex-wrap gap-2 mb-4 px-2">
          <Badge bg="info" className="py-2 px-3 fw-normal">Sin gluten</Badge>
          <Badge bg="info" className="py-2 px-3 fw-normal">Vegetariano</Badge>
          <Badge bg="primary" className="py-2 px-3 fw-normal bg-opacity-75">Precio</Badge>
          <Badge bg="primary" className="py-2 px-3 fw-normal bg-opacity-75 cursor-pointer" onClick={() => setShowAlergenos(true)}>
            Alergenos
          </Badge>
        </div>

        <div className="d-flex flex-column gap-3 px-2">
          {productos.map(p => (
            <Card 
              key={p.id} 
              className="border-0 shadow-sm overflow-hidden flex-row hover-transform cursor-pointer bg-soft-blue rounded-12" 
              onClick={() => setProductoSeleccionado(p)}
            >
              <div className="img-100 flex-shrink-0 bg-white p-2">
                <img 
                  src={`https://source.unsplash.com/random/200x200/?food,${encodeURI(p.nombre)}`} 
                  alt={p.nombre} 
                  className="w-100 h-100 object-fit-cover rounded"
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center p-2 px-3 pe-4 text-end">
                <h5 className="h6 fw-bold text-dark mb-1">{p.nombre}</h5>
                <span className="small text-dark mb-0">Precio: {p.precio.toFixed(2)}€</span>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      <footer className="bg-primary w-100 text-white text-center py-3 mt-auto">
        <p className="m-0 mb-1">Número tlf: 688461344</p>
        <Button variant="link" className="text-white text-decoration-none p-0 m-0" onClick={() => setShowAlergenos(true)}>
          Enlace Alergenos
        </Button>
      </footer>

      {/* Modal Detalle Producto */}
      <Modal show={!!productoSeleccionado} onHide={() => setProductoSeleccionado(null)} centered size="md" className="modal-fullscreen-sm-down">
        {productoSeleccionado && (
          <div className="bg-light h-100 d-flex flex-column">
             <div className="bg-dark position-relative h-350">
                <img 
                  src={`https://source.unsplash.com/random/800x600/?food,${encodeURI(productoSeleccionado.nombre)}`} 
                  alt={productoSeleccionado.nombre} 
                  className="w-100 h-100 object-fit-cover opacity-75"
                />
             </div>
             
             <div className="flex-grow-1 p-4 text-center bg-soft-blue">
               <h2 className="display-6 fw-normal text-dark mb-1">{productoSeleccionado.nombre}</h2>
               <p className="text-secondary mb-4">Producto exótico elaborado por nuestro chef asiático</p>
               
               <h3 className="h3 fw-bold text-dark mb-5">Precio: {productoSeleccionado.precio.toFixed(2)}€</h3>
               
               <Button 
                variant="primary" 
                size="lg" 
                className="px-5 rounded-pill shadow-sm"
                onClick={() => setProductoSeleccionado(null)}
               >
                 Volver
               </Button>
             </div>
          </div>
        )}
      </Modal>

      <ModalAlergenos show={showAlergenos} onHide={() => setShowAlergenos(false)} />
    </div>
  );
}
