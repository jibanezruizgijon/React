import axios from 'axios';


// Creamos una instancia configurada

const clienteApi = axios.create({

    baseURL: 'http://localhost:8080/api', 

    headers: {
        'Content-Type': 'application/json'
    }

});


// --- Funciones para Empleados ---
export const obtenerEmpleados = async () => {
    try {
        const respuesta = await clienteApi.get('/employees');

        return respuesta.data; // Axios ya trae los datos procesados en .data
    } catch (error) {
        console.error('Error al obtener empleados:', error);

        throw error;
    }
}; 

export const eliminarEmpleado = async (id) => {
    try {
        const respuesta = await clienteApi.delete(`/employees/${id}`);

        return respuesta.data;
    } catch (error) {
        console.error('Error al eliminar empleado:', error);

        throw error;
    }
}; 

// --- Funciones para Mesas (Para cuando las implementes en Spring) ---

export const obtenerMesas = async () => {
    const respuesta = await clienteApi.get('/mesas');
    return respuesta.data;
};

