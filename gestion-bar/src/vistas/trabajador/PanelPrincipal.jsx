import { useState, useEffect } from 'react';
import PanelMesas from '../../componentes/PanelMesas';
import CuentaDetalle from '../../componentes/CuentaDetalle';
import { obtenerMesas, actualizarEstadoMesa, obtenerCuentaMesa, guardarPedido, cerrarCuenta } from '../../servicios/api';
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import ModalAñadirProducto from '../../componentes/ModalAñadirProducto';

export default function PanelPrincipal({ usuarioAutenticado }) {
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [productosCuenta, setProductosCuenta] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModalProductos, setMostrarModalProductos] = useState(false);

  const cargarMesas = async () => {
    try {
      const data = await obtenerMesas();
      setMesas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMesas();
  }, []);

  const manejarSeleccionMesa = async (mesa) => {
    setMesaSeleccionada(mesa);
    if (mesa.estado === 'libre') {
      await actualizarEstadoMesa(mesa.id, 'ocupada');
      setMesas(prev => prev.map(m => m.id === mesa.id ? { ...m, estado: 'ocupada' } : m));
      setMesaSeleccionada({ ...mesa, estado: 'ocupada' });
      setProductosCuenta([]);
    } else {
      const cuenta = await obtenerCuentaMesa(mesa.id);
      setProductosCuenta(cuenta);
    }
  };

  const manejarAbrirModal = () => {
    if (!mesaSeleccionada) return;
    setMostrarModalProductos(true);
  };

  const manejarAgregarProducto = async (producto, cantidad) => {
    if (!mesaSeleccionada) return;
    
    const { cuenta } = await guardarPedido(mesaSeleccionada.id, producto, cantidad);
    setProductosCuenta(cuenta);
    setMostrarModalProductos(false);
  };

  const manejarCerrarCuenta = async () => {
    if (!mesaSeleccionada) return;
    
    await cerrarCuenta(mesaSeleccionada.id);
    alert(`Cuenta de la Mesa ${mesaSeleccionada.nMesa} cobrada con éxito.`);
    setMesaSeleccionada(null);
    setProductosCuenta([]);
    cargarMesas();
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <Row className="g-4">
        <Col lg={8}>
          <PanelMesas 
            mesas={mesas} 
            onSeleccionarMesa={manejarSeleccionMesa} 
          />
        </Col>
        <Col lg={4}>
          <CuentaDetalle 
            mesaSeleccionada={mesaSeleccionada}
            productosCuenta={productosCuenta}
            onAgregarProducto={manejarAbrirModal}
            onCerrarCuenta={manejarCerrarCuenta}
          />
        </Col>
      </Row>

      {mostrarModalProductos && (
        <ModalAñadirProducto 
          show={mostrarModalProductos}
          onHide={() => setMostrarModalProductos(false)}
          onAdd={manejarAgregarProducto}
        />
      )}
    </>
  );
}
