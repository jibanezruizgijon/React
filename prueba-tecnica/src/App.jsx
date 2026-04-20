import { useState } from "react"
import { useEffect } from "react"
import "./App.css"
import {getRandomFact} from './services/facts.js'
const API_URL = "https://catfact.ninja/fact"

function App() {
  const [fact, setFact] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  useEffect(() => {
    if (!fact) return
    const primeraPalabra = fact.split(' ', 3).join(' ');
    console.log(primeraPalabra);

    fetch(`https://cataas.com/cat/says/${primeraPalabra}?size=50&color=red&json=true`)
      .then(respuesta => respuesta.json())
      .then(response => {
        console.log(response);
        const { url } = response
        setImagen(url);
      })
  }, [fact])

  const handleClick = async () => {
    await getRandomFact().then(setFact)
  }

  return (
    <main className="main">
      <h1>App de gatitos</h1>
      {fact &&
        <p>{fact}</p>
      }
      {imagen &&
        <img src={imagen} alt={`imagen extraida de la api: ${fact}`} />}
      <button onClick={handleClick}>Cargar nuevo gatito </button>
    </main>
  )
}

export default App