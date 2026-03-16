import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import ButtonComponent from './components/ButtonComponent'
import Login from './components/Login'
import ListaPeliculas from './components/ListaPeliculas'
import ListaMemes from './components/ListaMemes'

function App() {

  const decirHola = () => {
    console.log('hola');
  }
  // Hooks de un número que comienza en 0
  const [numero, setNumero] = useState(0);

  const [greeting, setGreeting] = useState('Bienvenidos desde greting');
  const sumar = () => {
    setNumero(numero + 1);
  }

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

  const condicional = false;

const [peliculas, setPeliculas] = useState(true);
  // useEffect (() => {
  //   console.log('Ejecucción cada vez que se renderice el componente');
  // })

  useEffect(() => {
    console.log('Ejecución con cada cambio de user');
  }, [user])
  return (
    <>
      <HeaderComponent greeting={greeting} links={links}></HeaderComponent>
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
        {condicional && <h2>La condicionales verdadera</h2>}
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
      <ListaMemes></ListaMemes>
    </>
  )
}

export default App
