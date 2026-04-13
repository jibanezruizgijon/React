import { useContext, useState } from 'react'
import PokemonList from '../components/PokemonList'
import PokemonDetails from '../components/PokemonDetails'
import Contador from '../components/contador'
import PokemonDetails2 from '../components/PokemonDetails2'
import DetailsWrapper from '../hoc/DetailsWrapper'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/user.context.jsx'
function PokemonsPages() {
  
  const {user, setUser} = useContext(UserContext);


  if (!user.isLogin) return <Navigate to={"/error"} />
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
    <main className='pokemons-page'>
      {user.name && 
      <section>
        <h2>Bienvenido {user.name}</h2>
        <button onClick={() => setUser({...user, name: "Luis"})}>Cambiar nombre</button>
      </section>
      }
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
    </main>
  )
}

export default PokemonsPages