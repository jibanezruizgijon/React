import { useEffect } from "react"

function ListaMemes() {

    const [memes, setMemes] = useState([]);
    useEffect(() => {
      fetch('https://api.imgflip.com/get_memes')
        .then(respuesta => respuesta.json())    
        .then(data => console.log(data.data.memes))  
    },[])
  return (
    <ul className="lista__meme" >

    </ul>
  )
}

export default ListaMemes