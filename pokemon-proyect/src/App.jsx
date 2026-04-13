import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import { lazy, Suspense } from 'react';
// import PokemonsPages from './pages/PokemonsPages'
// import PokemonPage from './pages/PokemonPage'
// import ErrorPage from './pages/ErrorPage'

// Al importar de esta forma, se hace una carga diferida de los componentes
// lo que mejora el rendimiento de la aplicación al no cargar todos los componentes al mismo tiempo.
const PokemonsPages = lazy(() => import('./pages/PokemonsPages'));
const PokemonPage = lazy(() => import('./pages/PokemonPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
function App() {
  return (
    <Suspense fallback={<h2>Cargando...</h2>}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pokemons' element={<PokemonsPages />} />
        <Route path="/pokemons/:id" element={<PokemonPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense >
  )
}

export default App
