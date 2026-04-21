import { Printer } from 'lucide-react';
import { Card, Table, Badge, Button } from 'react-bootstrap';

export default function TablaInventario({ productos, manejarImprimir }) {
  // Agrupar por categoría
  const porCategoria = productos.reduce((acc, p) => {
    if (!acc[p.categoria]) acc[p.categoria] = [];
    acc[p.categoria].push(p);
    return acc;
  }, {});

  return (
    <Card className="border-0 shadow-sm overflow-hidden h-100">
      <Card.Header className="bg-primary text-white py-3 text-center border-0">
        <h2 className="fs-5 fw-bold m-0 tracking-widest text-uppercase">Inventario Detallado</h2>
      </Card.Header>
      
      <Card.Body className="p-0">
        <div className="p-4 mh-600 overflow-auto custom-scrollbar">
          {Object.keys(porCategoria).map(cat => (
            <div key={cat} className="mb-4">
              <h3 className="fs-6 bg-light text-primary fw-bold p-3 m-0 rounded-top border border-bottom-0">
                {cat}
              </h3>
              
              <Table bordered hover responsive className="m-0 border-top-0">
                <thead className="table-light">
                  <tr>
                    <th className="text-secondary small text-uppercase">Producto</th>
                    <th className="text-center text-secondary small text-uppercase w-90">Stock</th>
                    <th className="text-center text-secondary small text-uppercase w-90">Mínimo</th>
                    <th className="text-center text-secondary small text-uppercase w-90">Crítico</th>
                  </tr>
                </thead>
                <tbody>
                  {porCategoria[cat].map(p => (
                    <tr key={p.id}>
                      <td className="fw-medium text-dark align-middle">{p.nombre}</td>
                      <td className="text-center align-middle">
                        <Badge 
                          bg={p.stock < 15 ? 'danger' : p.stock <= 30 ? 'warning' : 'success'}
                          className="px-3 py-2 rounded-pill fs-6"
                        >
                          {p.stock}
                        </Badge>
                      </td>
                      <td className="text-center align-middle text-muted fw-bold">30</td>
                      <td className="text-center align-middle text-danger opacity-75 fw-bold">15</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-light border-top text-center">
          <Button 
            variant="outline-primary"
            onClick={manejarImprimir}
            className="px-5 py-2 fw-bold d-inline-flex align-items-center gap-2"
          >
            <Printer className="w-5 h-5" /> Exportar Inventario
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
