export const buscarPeliculas = async ({ search }) => {
    if (search == "") return

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=21191c88&s=${search}`)
        const json = await response.json()

        const peliculas = json.Search

        return peliculas?.map(pelicula => ({

            id: pelicula.imdbID,
            titulo: pelicula.Title,
            anio: pelicula.Year,
            imagen: pelicula.Poster
        }))
    } catch (error) {
        throw new Error("Error al buscar peliculas")
    }
   
}