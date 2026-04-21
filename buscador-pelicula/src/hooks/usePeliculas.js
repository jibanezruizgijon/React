import { useRef, useState, useMemo, useCallback } from "react"
import { buscarPeliculas } from "../services/peliculas"
export function usePeliculas({ search, sort }) {
    const [peliculas, setPeliculas] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    // La constante previousSearch hace que la busqueda a la api no se repita si se hace una llamada igual 
    const previousSearch = useRef(search)


    const getPeliculas = useCallback( async ([{search}]) => {
        
            if (search === previousSearch.current) return
            try {
                setError(null)
                setLoading(true)
                previousSearch.current = search
                const peliculas = await buscarPeliculas({ search })
                setPeliculas(peliculas)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
    }, [])

    const sortedPeliculas = useMemo(() => {
        return sort
            ? [...peliculas].sort((a, b) => a.titulo.localeCompare(b.titulo))
            : peliculas
    }, [sort, peliculas])



    return { peliculas: sortedPeliculas, getPeliculas, loading }
}