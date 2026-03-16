import { use, useEffect } from "react";

function ListaPeliculas(props) {
    const peliculas = ['Dune', 'Cars', 'El señor de los anillos', 'Iron Man'];

    const HtmlPeliculas = peliculas.map((pelicula, index) => {
        return <li key={index}>{index+1} - {pelicula}</li>
    })

    useEffect(()=> {
        console.log('peliculas cargadas');
    }, [])

    useEffect(() => {
        return () => {
            console.log('desmontado');
        }
    }, [])
    return (
        <section>
            <h2>Lista de peliculas</h2>
            <ul>
                {HtmlPeliculas}
            </ul>
        </section>
    )
}

export default ListaPeliculas