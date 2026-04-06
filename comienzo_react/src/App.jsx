import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import ButtonComponent from './components/ButtonComponent'
import Login from './components/Login'
import ListaPeliculas from './components/ListaPeliculas'
import ListaMemes from './components/ListaMemes'
import ListaAnimales from './components/ListaAnimales'

function App() {

  const decirHola = () => {
    console.log('hola a ' + user.name);
  }
  // Hooks de un número que comienza en 0 (variable reactiva)
  const [numero, setNumero] = useState(0);

  const [greeting, setGreeting] = useState('Bienvenidos desde greting');
  const [subtitulo, setSubtitulo] = useState('Subtitulo para el header');
  const sumar = () => {
    setNumero(numero + 1);
  }

  // cambia el contenido del input y lo muestra por consola cada vez que se escribe algo en el input
  const cambiarContenido = (e) => {
    console.log(e.target.value);
  }

  const [user, setUser] = useState({});
  const links = {
    inicio: 'Inicio',
    acerca: 'Acerca de',
    contacto: 'Contacto'
  }

  const login = (userInfo) => {
    console.log(userInfo);
    setUser(userInfo);
  }

  // es un booleano que se puede usar para mostrar o ocultar elementos en la interfaz de usuario. 
  // Si es verdadero, se muestra el elemento; si es falso, se oculta.  
  const condicional = true;

  const [peliculas, setPeliculas] = useState(true);
  // useEffect (() => {
  //   console.log('Ejecucción cada vez que se renderice el componente');
  // })

  useEffect(() => {
    console.log('Ejecución con cada cambio de user');
  }, [user])
  return (
    <>
      <HeaderComponent greeting={greeting} subtitulo={subtitulo} links={links}></HeaderComponent>
      <hr />
      <main className='main__content'>

        {/* Condicional. Si el nombre es verdadero, entonces se ejecuta el h2 */}
        {user.name && <h2 onClick={decirHola}>Hola a {user.name}</h2>}

        <Login ManejarLogin={login}></Login>
        <br />
        <br />
        <button onClick={sumar}>Aumentar </button>
        <h2>Número : {numero}</h2>

        <br />
        <input type="text" onChange={cambiarContenido} />

        <ButtonComponent ></ButtonComponent>
        <br />
        {/* Condicionales  */}
        {condicional && <h2>La condicional es verdadera</h2>}
        {!condicional && <h2>La condicional no es verdadera</h2>}
        {/* Condicional como si tuviera if y else */}
        {
          condicional ?
            (<h2>La condicional verdadera</h2>)
            : (<h2>La condicional no es verdadera</h2>)
        }
        <hr />

      </main>
      <hr />
      <section className='section__hook'>
        <button onClick={() => setPeliculas(!peliculas)}>Mostar Peliculas</button>
        {peliculas && <ListaPeliculas></ListaPeliculas>}
      </section>
      <hr />
      {/* <ListaAnimales></ListaAnimales> */}
      <ListaMemes></ListaMemes>
    </>
  )
}

export default App
