import DetailsWrapper from '../hoc/DetailsWrapper';
import './PokemonDetails.css'
function PokemonDetails(props) {
    const { pokemon, likes, aumentarLikes } = props;

    return (
        <section className='pokemon__selected'>
            <div>
                <h3>Pokemon 1</h3>
                <h4>Likes: {likes} </h4>
                <button onClick={aumentarLikes}>Like</button>
            </div>
            <div className="pokemon__container">
                <h2 className='pokemon__selected-name'>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt="pokemon img" className='pokemon__selected-img' />
                <h3 className='pokemon__selected-hp'>HP: {pokemon.stats[0].base_stat}</h3>
            </div>
        </section>
    )
}

export default PokemonDetails