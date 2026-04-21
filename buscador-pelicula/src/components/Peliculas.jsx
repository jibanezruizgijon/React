

function MostrarPeliculas({ peliculas }) {

    return (
        <ul className="peliculas">
            {peliculas.map(pelicula => (
                <li className='pelicula' key={pelicula.id}>
                    <h2>{pelicula.titulo}</h2>
                    <p>{pelicula.anio}</p>
                    <img src={pelicula.imagen} alt={pelicula.titulo} />
                </li>
            ))
            }
        </ul>
    )
}

function SinPeliculas() {
    return (
        <div>
            <p>No se encontraron peliculas</p>
        </div>
    )
}

export function Peliculas({ peliculas }) {

    const tienePeliculas = peliculas?.length > 0
    return (
        tienePeliculas ?
            <MostrarPeliculas peliculas={peliculas} />
            : <SinPeliculas />
    )
}