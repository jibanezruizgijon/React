import { useContext } from "react"
import { TaskContext } from "../context/task.context";
function TaskCard({task}) {
  const {updateTask} = useContext(TaskContext);
  const handleInput = (e) => {
    const actualizarTarea = {...task, title: e.target.value}
    updateTask(actualizarTarea);
  }
  const handleCheck = () => {
    const actualizarTarea = {...task, completed: !task.completed}
    updateTask(actualizarTarea);
  }
  return (
    <article className="task-card"> 
    <input type="text" className="card-title" value={task.title} onChange={handleInput} />
    <input type="checkbox" checked={task.completed} onChange={handleCheck}/>
    </article>
  )
}

export default TaskCard