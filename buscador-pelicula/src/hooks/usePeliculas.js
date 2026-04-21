import { useState } from "react"
import { buscarPeliculas } from "../services/peliculas"
export function usePeliculas({search}) {
    const [peliculas, setPeliculas] = useState([])
    
    const getPeliculas = async () => {
        const peliculas = await buscarPeliculas({search})
        setPeliculas(peliculas)
    }
 
    return { peliculas, getPeliculas }
}