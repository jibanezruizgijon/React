import { use, useState } from "react"
import { useEffect } from "react"
import "./App.css"
import { getRandomFact } from './services/facts.js'
import { useCatImage } from "./hooks/useCatImage.js"
import { useCatFact } from "./hooks/useCatFact.js"
import Otro from "./components/Otro.jsx"
const API_URL = "https://catfact.ninja/fact"



function App() {
  const { fact, refreshFact } = useCatFact()
  const { imagen } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
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

      <Otro></Otro>
    </main>
  )
}

export default App