import { useState } from "react"
import { useEffect } from "react"
const API_URL = "https://catfact.ninja/fact"
const PREFIJO_URL = "https://cataas.com"
//const API_URL2 = `https://cataas.com/cat/says/${primeraPalabra}?size=50&color=red&json=true`
function App() {
  const [fact, setFact] = useState("");
  const [imagen, setImagen] = useState("");
  useEffect(() => {
    fetch(API_URL)
      .then(respuesta => respuesta.json())
      .then(data => {
        const { fact } = data
        setFact(fact);
        const primeraPalabra = fact.split(' ')[0];
        console.log(primeraPalabra);
    
        fetch(`https://cataas.com/cat/says/${primeraPalabra}?size=50&color=red&json=true`)
          .then(respuesta => respuesta.json())
          .then(response => {
            const { url } = response
            setImagen(url);
          })
      })
  }, [])

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact &&
        <p>{fact}</p>
      }
      {imagen &&
        <img src={`${PREFIJO_URL}${imagen}`} alt={`imagen extraida de la api: ${fact}`}/>}
    </main>
  )
}

export default App