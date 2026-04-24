import { Modal, Button } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';

export default function ModalConfirmacion({ show, onHide, onConfirm, title = "Confirmar Eliminación", message, itemName }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title className="fw-bold fs-5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 text-center">
        <Trash2 className="text-danger mb-3" size={48} />
        <h4 className="fw-bold mb-3">¿Estás seguro?</h4>
        <p className="text-muted mb-0">
          {message ? message : (
            <>
              ¿Deseas eliminar <strong>{itemName}</strong>?
            </>
          )}
        </p>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="outline-secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" className="fw-bold px-4" onClick={onConfirm}>
          Sí, Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
