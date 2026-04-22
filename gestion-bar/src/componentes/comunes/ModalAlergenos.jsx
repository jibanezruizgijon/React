import { Modal, ListGroup } from 'react-bootstrap';

const alergenosData = [
  { id: 'gluten', nombre: 'Gluten', desc: 'Proteína presente en cereales como trigo, cebada y centeno', color: '#cd7f32', simbolo: 'G' },
  { id: 'huevo', nombre: 'Huevo', desc: 'Huevo y productos que lo contienen como ingrediente', color: '#ffb347', simbolo: 'H' },
  { id: 'soja', nombre: 'Soja', desc: 'Legumbre utilizada en muchos productos y derivados vegetales', color: '#77dd77', simbolo: 'S' },
  { id: 'molusco', nombre: 'Molusco', desc: 'Mariscos como mejillones, almejas, ostras o calamares', color: '#aec6cf', simbolo: 'M' },
  { id: 'cascara', nombre: 'Frutos con Cascara', desc: 'Incluye nueces, almendras, avellanas, pistachos, etc', color: '#ff6961', simbolo: 'FC' },
  { id: 'crustaceo', nombre: 'Crustáceo', desc: 'Mariscos como gambas, langostinos, cangrejos o bogavantes', color: '#779ecb', simbolo: 'C' },
  { id: 'pescado', nombre: 'Pescado', desc: 'Carne y derivados de pescado marino o de agua dulce', color: '#03C03C', simbolo: 'P' },
  { id: 'sesamo', nombre: 'Granos de Sésamo', desc: 'Semillas de sésamo y productos derivados', color: '#BDB76B', simbolo: 'GS' },
  { id: 'mostaza', nombre: 'Mostaza', desc: 'Semillas y productos elaborados a base de mostaza', color: '#FFD700', simbolo: 'MZ' },
  { id: 'lactosa', nombre: 'Lactosa', desc: 'Azúcar natural de la leche y productos lácteos', color: '#8B4513', simbolo: 'L' },
  { id: 'cacahuete', nombre: 'Cacahuetes', desc: 'Cacahuetes y productos derivados', color: '#ffb347', simbolo: 'CAC' },
  { id: 'apio', nombre: 'Apio', desc: 'Apio y productos derivados', color: '#ffb347', simbolo: 'AP' },
  { id: 'sulfitos', nombre: 'Sulfitos', desc: 'Sulfitos y productos derivados', color: '#ffb347', simbolo: 'SUL' },
  { id: 'altramuces', nombre: 'Altramuces', desc: 'Altramuces y productos derivados', color: '#ffb347', simbolo: 'ALT' },
];

export default function ModalAlergenos({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Header closeButton className="bg-primary text-white border-0">
        <Modal.Title className="fs-5">Nombre del restaurante</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <ListGroup variant="flush">
          {alergenosData.map((alergeno) => (
            <ListGroup.Item key={alergeno.id} className="d-flex align-items-start border-bottom py-3 px-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3 flex-shrink-0 square-40"
                style={{ backgroundColor: alergeno.color }}
              >
                {alergeno.simbolo}
              </div>
              <div>
                <h6 className="fw-bold mb-1">{alergeno.nombre}</h6>
                <p className="text-secondary small mb-0 lh-sm">{alergeno.desc}</p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
