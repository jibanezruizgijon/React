import { use, useEffect, useState } from "react";
import PokemonCard from "./PokemonCard"
import './PokemonList.css'

function PokemonList(props) {
    const [pokemons, setPokemons] = useState([])
    const { PokemonSelected } = props;
    const fetchPokemon = async (index) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        const data = await response.json()
        return data;
    }

    const getPokemons = async (cantidad) => {
        const pokemons = []
        for (let i = 1; i <= cantidad; i++) {
            const pokemon = await fetchPokemon(i)
            pokemons.push(pokemon)
        }
        setPokemons(pokemons);
    }

    useEffect(() => {
        getPokemons(10);
    }, [])

    const pokemonCards = pokemons.map(pokemon => {
        return <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            PokemonSelected={PokemonSelected}
        ></PokemonCard>
    })
    return (
        <ul className="pokemon__list">
            {pokemonCards}
        </ul>
    )
}

export default PokemonList