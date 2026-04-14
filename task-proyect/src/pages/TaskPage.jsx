import { useContext, useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent"
import { TaskContext } from "../context/task.context";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
function TaskPage() {
    const { tasks, getTasks, hasLoading, error } = useContext(TaskContext);

    useEffect(() => {
        getTasks();
    }, []);
    const cardTask = tasks.map((task) => (
        <li key={task.id}>
            <TaskCard task={task} />
        </li>
    ));

    return (
        <>
            <HeaderComponent></HeaderComponent>
            <section className="task-section">
                <h2 className="task-title">Task</h2>

                <ul className="task-list">
                    <li>
                        <CreateTask />
                    </li>
                    {error ? (
                        <p className="error">Error al cargar las tareas</p>
                    ) : hasLoading ? (
                        <p className="loading">Cargando tareas...</p>
                    ) : (
                        cardTask
                    )}
                </ul>
            </section>
        </>
    )
}

export default TaskPage