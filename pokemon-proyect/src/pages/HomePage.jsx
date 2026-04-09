import logo from '../assets/logo.png'
import './homePage.css'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <section className='home__page'>
        <h1 className="home__title">Bienvenido </h1>
        <img src={logo} alt="Logo" className='logo'/>
        <Link to='/pokemons' className='link'>Entrar</Link>
    </section>
  )
}

export default HomePage