import { useState, useEffect } from "react"
export function useCatImage({ fact }) {
  const [imagen, setImagen] = useState();
  // Recoge una imagen de la api y la guarda en el estado imagen
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
  return { imagen }
}