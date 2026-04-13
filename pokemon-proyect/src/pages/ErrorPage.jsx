import { Link } from "react-router-dom"
function ErrorPage() {
  return (
    <section className="page-error">
        <h1>Error</h1>
        <h2>No puedes entrar aqui</h2>
        <Link to="/" className="link" >Regresar </Link>
    </section>
  )
}

export default ErrorPage