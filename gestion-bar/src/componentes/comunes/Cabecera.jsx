import { useState } from 'react';
import { LogOut, Calculator, Menu, Info } from 'lucide-react';
import { Button } from 'react-bootstrap';
import Calculadora from '../tpv/Calculadora';
import ModalAlergenos from './ModalAlergenos';
import { useAuth } from '../../contextos/AuthContext';

export default function Cabecera({ onToggleSidebar }) {
  const { logout } = useAuth();
  const [mostrarCalc, setMostrarCalc] = useState(false);
  const [mostrarAlergenos, setMostrarAlergenos] = useState(false);

  return (
    <header className="mb-4 d-flex justify-content-between align-items-center bg-white p-3 p-md-4 rounded shadow-sm border position-relative z-header">
      <div className="d-flex align-items-center gap-3">
        <Button variant="outline-primary" className="d-lg-none" onClick={onToggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="h4 fw-bold text-dark mb-0">Gestión<span className="text-primary">Bar</span></h1>
          <p className="text-secondary small mb-0">Panel de Control</p>
        </div>
      </div>

      <div className="d-flex gap-5 align-items-center ">
        {/* Toggle de Alérgenos */}
        <Button
          variant="light"
          onClick={() => setMostrarAlergenos(true)}
          className="text-info shadow-sm fw-bold"
          title="Información de Alérgenos"
        >
          <Info className="w-5 h-5 z-3" /> Alérgenos
        </Button>
        <ModalAlergenos show={mostrarAlergenos} onHide={() => setMostrarAlergenos(false)} />

        {/* Toggle de Calculadora */}
        <div className="position-relative">
          <Button
            variant="light"
            onClick={() => setMostrarCalc(!mostrarCalc)}
            className="text-primary shadow-sm fw-bold"
            title="Calculadora"
          >
            <Calculator className="w-5 h-5 z-3" /> Calculadora
          </Button>

          {mostrarCalc && (
            <Calculadora onClose={() => setMostrarCalc(false)} />
          )}
        </div>

        {/* Cierre de sesión */}
        <Button
          variant="outline-danger"
          onClick={logout}
          className="d-flex align-items-center gap-2 shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span className="d-none d-sm-inline fw-bold">Salir</span>
        </Button>
      </div>
    </header>
  );
}
