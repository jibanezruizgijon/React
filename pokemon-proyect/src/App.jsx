import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
// import PokemonsPages from './pages/PokemonsPages'
// import PokemonPage from './pages/PokemonPage'
// import ErrorPage from './pages/ErrorPage'
// Al importar de esta forma, se hace una carga diferida de los componentes
// lo que mejora el rendimiento de la aplicación al no cargar todos los componentes al mismo tiempo.
const PokemonsPages = React.lazy(() => import('./pages/PokemonsPages'));
const PokemonPage = React.lazy(() => import('./pages/PokemonPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/pokemons' element={<PokemonsPages />} /> 
      <Route path="/pokemons/:id" element={<PokemonPage />} />
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  )
}

export default App
