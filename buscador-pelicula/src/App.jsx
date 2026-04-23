import './App.css'
import { Peliculas } from './components/Peliculas'
import { usePeliculas } from './hooks/usePeliculas'
import { useRef, useEffect, useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ""
      return
    }
    if (search === "") {
      setError("No se puede buscar una pelicula vacía")
      return
    }

    if (search.length < 3) {
      setError("La pelicula debe tener al menos 3 caracteres")
      return
    }

    setError(null)
  }, [search])
  return { search, setSearch, error }
}

function App() {
  const { search, setSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { peliculas, getPeliculas, loading } = usePeliculas({ search, sort })

  const debouncedGetPeliculas = useCallback(debounce(search => {
    console.log(search)
    getPeliculas({ search })
  }, 400), [getPeliculas]) 

  const handleSubmit = (e) => {
    e.preventDefault()
    getPeliculas({ search })
  }

  const handleChangue = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetPeliculas( newSearch )
  }

  const handleSort = () => {
    setSort(!sort)
  }

  // Api key :  21191c88
  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input
            style={{
              border: "1px solid",
              borderColor: error ? "red" : "transparent"
            }}
            onChange={handleChangue}
            name="query" value={search}
            className='input'
            type="text"
            placeholder='Search' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button className='button' type="submit">Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Peliculas peliculas={peliculas} />
        }

      </main>
    </div>
  )
}

export default App