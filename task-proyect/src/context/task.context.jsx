import { createContext } from "react";
import { useState } from "react";
const TaskContext = createContext();

function TaskProvider(props) {
    const [tasks, setTasks] = useState([]);
    const [hasLoading, setHasLoading] = useState(false);
    const [error, setError] = useState(false);

    const API_URL = "https://cae5060a3b8cc5ba539c.free.beeceptor.com/api/task/";

    const getTasks = async () => {
        if (hasLoading) return;

        setHasLoading(true);
        try {
            const respuesta = await fetch(`${API_URL}`);
            const datos = await respuesta.json();

            setTasks(datos);
            setError(false);
        } catch (error) {
            setError(true);
        } finally {
            setHasLoading(false);
        }
    };
    const addTask = async (nuevaTarea) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaTarea)
            });
            // Si la API falla pero no lanza excepción, esto asegura que veamos el error
            if (response.ok) {
                setTasks([...tasks, nuevaTarea]);
                setError(false);
            }
        } catch (error) {
            setError(true);
        }
    }

    const updateTask = (actualizar) => {
        const actualizarTareas = tasks.map((task) => {
            if (task.id !== actualizar.id) return task;
            return actualizar;
        });
        setTasks(actualizarTareas);
    }
    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            updateTask,
            addTask,
            getTasks,
            hasLoading,
            error
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}
export { TaskContext, TaskProvider }
