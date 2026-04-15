import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { obtenerEmpleados, eliminarEmpleado } from '../service/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    const cargarEmpleados = async () => {
        try {
            const datos = await obtenerEmpleados();
            setEmployees(datos);
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    const manejarEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
            try {
                await eliminarEmpleado(id);
                // Refrescamos la lista tras eliminar
                cargarEmpleados();
            } catch (error) {
                alert("No se pudo eliminar al empleado");
            }
        }
    };

    useEffect(() => {
        cargarEmpleados();
    }, []);

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h2 className="mb-4">Lista de Personal</h2>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.role}</td>
                                    <td className="d-flex gap-2">
                                        <Link to={`/edit/${employee.id}`} className='btn btn-success btn-sm'>Editar</Link>
                                        <Button variant="danger" size="sm" onClick={() => manejarEliminar(employee.id)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeList;