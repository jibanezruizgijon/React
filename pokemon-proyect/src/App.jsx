import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import PokemonPages from './pages/PokemonPages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/pokemons' element={<PokemonPages />} /> 
    </Routes>
  )
}

export default App
