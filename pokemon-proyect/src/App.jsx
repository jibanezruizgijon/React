import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'

function App() {
  const [count, setCount] = useState(0)
  const [pokemonSelected, setPokemonSelected] = useState()
  return (
    <>
    {pokemonSelected && (
      <PokemonDetails pokemon={pokemonSelected}></PokemonDetails>
    )}
     <h2 className='titulo'>Lista de pokemon</h2>
     <PokemonList PokemonSelected={setPokemonSelected}></PokemonList>
    </>
  )
}

export default App
