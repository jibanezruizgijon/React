import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table, Button,} from 'react-bootstrap'
const EmployeeList = () => {
    const API_URL = "http://localhost:8080/api/employees";

    const [employees, setEmployees] = useState([])

    // Obtener la lista de empleados
    const fetchEmployees = async () => {
        axios.get(API_URL).then(response => {
            setEmployees(response.data);
            console.log(response.data)
        })
            .catch(error => console.error(error));
    };

    //Eliminar un empleado por su ID
    const deleteEmployee = async (id) => {
        axios.delete(`${API_URL}/${id}`).then(response => {
            console.log(response.data);
            fetchEmployees();
        })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchEmployees();
    }, [])

    return (
        <div>
            <h1>Employee List</h1>
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees && employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.role}</td>
                                        <td>
                                            <Link to={`/edit/${employee.id}`} className='btn btn-success'>Editar</Link>
                                            <Button variant="danger" onClick ={() => deleteEmployee(employee.id)}>Eliminar</Button>
                                        </td>
                                    </tr>
                                ))}
                              
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EmployeeList