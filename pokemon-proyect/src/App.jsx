import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import Contador from './components/contador'
import PokemonDetails2 from './components/PokemonDetails2'


function App() {
  const [pokemonSelected, setPokemonSelected] = useState();
  const [pokemonSelected2, setPokemonSelected2] = useState();
  return (
    <>
    <h2>Pokemon Seleccionados</h2>
    {pokemonSelected && (
      <PokemonDetails pokemon={pokemonSelected}></PokemonDetails>
    )}
    {pokemonSelected2 && (
      <PokemonDetails2 pokemon={pokemonSelected2}></PokemonDetails2>
    )}
     <h2 className='titulo'>Lista de pokemon</h2>
     
     <PokemonList PokemonSelected={setPokemonSelected} PokemonSelected2={setPokemonSelected2}></PokemonList>
     <Contador></Contador>
    </>
  )
}

export default App
