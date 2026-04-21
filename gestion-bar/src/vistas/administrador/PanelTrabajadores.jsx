import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';
import { obtenerPersonal } from '../../servicios/api';
import { Card, Spinner, Button } from 'react-bootstrap';
import TarjetaEmpleado from '../../componentes/trabajadores/TarjetaEmpleado';

import useFetchData from '../../hooks/useFetchData';

export default function PanelTrabajadores() {
  const { data: trabajadores = [], cargando } = useFetchData(obtenerPersonal, []);

  if (cargando) return (
    <div className="text-center p-5 text-primary">
      <Spinner animation="border" />
      <div className="mt-3 fw-bold">Cargando personal...</div>
    </div>
  );

  const totalActivos = trabajadores.filter(t => t.estado).length;
  const totalBajas = trabajadores.length - totalActivos;

  return (
    <div className="d-flex flex-column gap-4">
      <Card className="border-0 shadow-sm p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div className="d-flex gap-3">
            <div className="bg-light border border-primary border-opacity-25 rounded px-4 py-3 text-center">
              <span className="d-block small fw-bold text-primary text-uppercase mb-1">Total Personal</span>
              <span className="fs-3 fw-black text-dark">{trabajadores.length}</span>
            </div>
            <div className="bg-light border border-danger border-opacity-25 rounded px-4 py-3 text-center">
              <span className="d-block small fw-bold text-danger text-uppercase mb-1">De Bajas</span>
              <span className="fs-3 fw-black text-danger">{totalBajas}</span>
            </div>
          </div>
          
          <Button 
            as={Link} 
            to="/admin/trabajadores/nuevo"
            variant="primary"
            className="d-flex align-items-center gap-2 fw-bold px-4 py-3 shadow-sm"
          >
            <UserPlus className="w-5 h-5" />
            Añadir Trabajador
          </Button>
        </div>
      </Card>

      <div>
        <div className="bg-primary text-white p-3 px-4 rounded-top d-flex align-items-center gap-2 shadow-sm">
          <Users className="w-5 h-5" />
          <h2 className="fs-5 fw-bold mb-0">Lista de Trabajadores</h2>
        </div>
        <div className="bg-white p-4 rounded-bottom shadow-sm border border-top-0">
          {trabajadores.map(t => <TarjetaEmpleado key={t.id} trabajador={t} />)}
        </div>
      </div>
    </div>
  );
}
