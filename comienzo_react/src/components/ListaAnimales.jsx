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
                <p> <strong>Edad:</strong> {animal.edad}</p>
            </li>
        )
    })
}