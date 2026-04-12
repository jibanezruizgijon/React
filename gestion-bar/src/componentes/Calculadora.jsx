import { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function Calculadora({ onClose }) {
  const [display, setDisplay] = useState('0');

  const manejarClick = (val) => {
    if (display === '0' && val !== '.') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const calcular = () => {
    try {
      const result = new Function('return ' + display)();
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const limpiar = () => setDisplay('0');

  const botones = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  return (
    <Card className="position-absolute end-0 mt-2 shadow-lg border-0" style={{ top: '100%', width: '280px', borderRadius: '16px', overflow: 'hidden', zIndex: 9999 }}>
      <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center p-3 border-0">
        <div className="d-flex align-items-center gap-2">
          <Calculator className="w-5 h-5" />
          <span className="fw-bold fs-6">Calculadora</span>
        </div>
        <Button variant="link" onClick={onClose} className="text-white p-0 m-0 text-decoration-none bg-transparent border-0 opacity-75 hover-opacity-100">
          <X className="w-5 h-5" />
        </Button>
      </Card.Header>
      
      <Card.Body className="bg-light p-3">
        <div className="bg-white border rounded p-3 mb-3 text-end fs-3 fw-bold text-dark font-monospace shadow-sm" style={{ minHeight: '60px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {display}
        </div>
        
        <Button 
          variant="outline-danger" 
          onClick={limpiar} 
          className="w-100 mb-3 fw-bold transition-all shadow-sm"
        >
          Limpiar (C)
        </Button>

        <div className="d-flex flex-column gap-2">
          {botones.map((fila, i) => (
            <Row key={i} className="g-2">
              {fila.map((btn) => (
                <Col key={btn} xs={3}>
                  <Button
                    variant={['/', '*', '-', '+', '='].includes(btn) ? 'primary' : 'white'}
                    onClick={() => btn === '=' ? calcular() : manejarClick(btn)}
                    className={`w-100 p-2 py-3 fw-bold shadow-sm ${['/', '*', '-', '+', '='].includes(btn) ? '' : 'border text-dark'}`}
                  >
                    {btn}
                  </Button>
                </Col>
              ))}
            </Row>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
