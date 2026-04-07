import { useEffect, useState } from "react"
import './PokemonCard.css'
function PokemonCard(props) {
  const { pokemon, PokemonSelected } = props;

  return (
    pokemon.id ?
    (
      <li className="pokemon__card" onClick={() => PokemonSelected(pokemon)} onAuxClick={() => props.PokemonSelected2(pokemon)}>
      <h2 className="pokemon__name">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt="pokemon img" className="pokemon__img" />
      <h3 className="text">HP: {pokemon.stats[0].base_stat}</h3>
    </li>
    ) : <p>Loading...</p>
  );
}

export default PokemonCard