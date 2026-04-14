import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/task" element={<TaskPage/>}/>
    </Routes>
  )
}

export default App
