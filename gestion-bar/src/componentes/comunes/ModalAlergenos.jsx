import { Modal, ListGroup } from 'react-bootstrap';
import { ALERGENOS_META } from '../../utils/alergenos';

// Construimos la lista desde el mapa centralizado para no duplicar datos
const alergenosList = [
  { id: 'gluten',     nombre: 'Gluten' },
  { id: 'huevo',      nombre: 'Huevo' },
  { id: 'soja',       nombre: 'Soja' },
  { id: 'molusco',    nombre: 'Molusco' },
  { id: 'cascara',    nombre: 'Frutos con Cáscara' },
  { id: 'crustaceo',  nombre: 'Crustáceo' },
  { id: 'pescado',    nombre: 'Pescado' },
  { id: 'sesamo',     nombre: 'Granos de Sésamo' },
  { id: 'mostaza',    nombre: 'Mostaza' },
  { id: 'lactosa',    nombre: 'Lácteos' },
  { id: 'cacahuete',  nombre: 'Cacahuetes' },
  { id: 'apio',       nombre: 'Apio' },
  { id: 'sulfitos',   nombre: 'Sulfitos' },
  { id: 'altramuces', nombre: 'Altramuces' },
];

export default function ModalAlergenos({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Header closeButton className="bg-primary text-white border-0">
        <Modal.Title className="fs-5">Información de Alérgenos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <ListGroup variant="flush">
          {alergenosList.map((alergeno) => {
            const meta = ALERGENOS_META[alergeno.id];
            return (
              <ListGroup.Item key={alergeno.id} className="d-flex align-items-center border-bottom py-3 px-4 gap-3">
                <div className="alergeno-modal-icono flex-shrink-0">
                  {meta?.icono ? (
                    <img src={meta.icono} alt={alergeno.nombre} className="alergeno-icono-lg" />
                  ) : (
                    <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold square-40">
                      {alergeno.id.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{alergeno.nombre}</h6>
                  <p className="text-secondary small mb-0 lh-sm">{meta?.desc ?? ''}</p>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
