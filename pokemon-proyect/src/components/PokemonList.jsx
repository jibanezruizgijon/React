import { useContext, useEffect, useMemo } from "react";
import PokemonCard from "./PokemonCard"
import './PokemonList.css'
import GetForm from "./GetForm";
import { PokemonContext } from "../context/pokemon.context";

function PokemonList(props) {
    const { pokemons, setPokemons, fetchPokemon } = useContext(PokemonContext);

    const { PokemonSelected } = props;

    const getPokemons = async (from, to) => {
        const pokemons = []
        for (let i = from; i <= to; i++) {
            const pokemon = await fetchPokemon(i)
            pokemons.push(pokemon)
        }
        setPokemons(pokemons);
    }

    useEffect(() => {
        getPokemons(1, 15);
    }, [])

    const pokemonCards = useMemo(() => pokemons.map((pokemon) => {
        return <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            PokemonSelected={PokemonSelected}
            PokemonSelected2={props.PokemonSelected2}
        ></PokemonCard>
    }),
        [pokemons]
    );
    return (
        <div>
            <GetForm getPokemons={getPokemons}></GetForm>
            <ul className="pokemon__list"> {pokemonCards} </ul>
        </div>
    )
}

export default PokemonList