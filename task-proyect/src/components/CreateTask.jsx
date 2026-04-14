import { useContext } from "react"
import { TaskContext } from "../context/task.context"
import { useState } from "react"
import { createId } from "../utils/utils"
function CreateTask() {
    const { addTask } = useContext(TaskContext);
    const [taskTitle, setTaskTitle] = useState("");
    const handleInput = (e) => {
        setTaskTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim() === "") return;
        const nuevaTarea = {
            id: createId(),
            title: taskTitle,
            completed: false
        }
        addTask(nuevaTarea);
        setTaskTitle("");
    }
    return (
        <form className="form" onSubmit={handleSubmit} >
            <input type="text"
                className="task-title"
                placeholder="Nueva tarea"
                value={taskTitle}
                onChange={handleInput} />
                <br />
            <button type="submit" className="create-btn">Agregar tarea</button>
        </form>
    )
}

export default CreateTask