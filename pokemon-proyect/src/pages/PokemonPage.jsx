import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './PokemonPage.css'
import { PokemonContext } from '../context/pokemon.context';
function PokemonPage() {
    const { id } = useParams();
    const [error, setError] = useState();
    const [pokemon, setPokemon] = useState();
    const { fetchPokemon } = useContext(PokemonContext);
    useEffect(() => {
        getPokemon(id);
    }, [id]);

    const getPokemon = async () => {
        try {
            const pokemon = await fetchPokemon(id);
            setPokemon(pokemon);
        } catch (error) {
            setError(error);
        }

    }
    const navigate = useNavigate();
    const goToPokemon = (id) => {
        navigate(`/pokemons/${id}`);
    }
    return (
        <section className='pokemon-page'>
            <h1>Pokemon Page</h1>
            {error ? (
                <div>
                    <h2>No se ha encontrado ningún pokemon</h2>
                    <Link to={"/pokemons"}>Volver a la lista de pokemon</Link>
                </div>
            ) : (
                <>
                    {pokemon ? (
                        <div>
                            <h2>{pokemon.name}</h2>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <div className='link'>
                                <button className='btn' onClick={() => goToPokemon(Number(id) - 1)}>-</button>
                                <button className='btn' onClick={() => goToPokemon(Number(id) + 1)}>+</button>
                            </div>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </>
            )}

        </section>
    )
}

export default PokemonPage