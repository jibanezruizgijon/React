import { useEffect, useState } from "react"
import './ListaMemes.css';
function ListaMemes() {

  const [memes, setMemes] = useState([]);

  const HTMLMemes = memes.map((meme) => {
    return (
      <li key={meme.id} className="meme__item">
        <h3 className="meme__name">{meme.name}</h3>
        <img src={meme.url} alt={meme.name}  className="meme__img"/>
      </li>
    )
  });
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log(data.data.memes);
        setMemes(data.data.memes);
      })
  }, [])
  return (
    <section className="section__memes">
      <h2>Lista de Memes</h2>
      <ul>
        {HTMLMemes}
      </ul>
    </section>
  )
}

export default ListaMemes