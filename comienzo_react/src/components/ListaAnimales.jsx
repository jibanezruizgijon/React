import './ListaAnimales.css';
function ListaAnimales(){
    const animales = [
        {
            id: 1,
            name: 'Perro',
            edad: 10
        },
        {
            id: 2,
            name: 'Gato',
            edad: 5
        },
        {
            id: 3,
            name: 'Conejo',
            edad: 2
        }
    ];

    const HtmlAnimales = animales.map((animal) => {
        return(
            <li key={animal.id}>
                <h3>{animal.name}</h3>
                <p> <span className="sub">Edad: </span> {animal.edad}</p>
            </li>
        )
    })

    return(
        <section>
            <h2>Lista de animales</h2>
            <ul>
                {HtmlAnimales}
            </ul>
        </section>
    )
}
export default ListaAnimales;