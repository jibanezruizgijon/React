import { useState } from 'react'
import PokemonList from '../components/PokemonList'
import PokemonDetails from '../components/PokemonDetails'
import Contador from '../components/contador'
import PokemonDetails2 from '../components/PokemonDetails2'
import DetailsWrapper from '../hoc/DetailsWrapper'
function PokemonPages() {
    const [pokemonSelected, setPokemonSelected] = useState();
  const [pokemonSelected2, setPokemonSelected2] = useState();

  const getDetails1 = (likes, aumentarLikes) => {
    return (
      <PokemonDetails pokemon={pokemonSelected} likes={likes} aumentarLikes={aumentarLikes}></PokemonDetails>
    )
  }

  const getDetails2 = (likes, aumentarLikes) => {
    return (
      <PokemonDetails2 pokemon={pokemonSelected2} likes={likes} aumentarLikes={aumentarLikes}></PokemonDetails2>
    )
  }
  return (
    <>
      <h2>Pokemon Seleccionados</h2>
      {pokemonSelected && (
        <DetailsWrapper render={getDetails1}></DetailsWrapper>
      )}
      {pokemonSelected2 && (
        <DetailsWrapper render={getDetails2}></DetailsWrapper>
      )}
      <h2 className='titulo'>Lista de pokemon</h2>

      <PokemonList PokemonSelected={setPokemonSelected} PokemonSelected2={setPokemonSelected2}></PokemonList>
      <Contador></Contador>
    </>
  )
}

export default PokemonPages