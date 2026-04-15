import { Routes, Route } from 'react-router-dom'
import EmployeeList from './components/EmployeeList'
function App() {
  return (
    <div>
      <h1>React - Spring Boot</h1>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        
      </Routes>
    </div>
  )
}

export default App