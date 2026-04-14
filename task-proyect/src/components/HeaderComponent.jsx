import { Link } from "react-router-dom"
import './HeaderComponent.css'
function HeaderComponent() {
  return (
    <header className="header">
        <nav className="nav">
            <ul>
                <li>
                    <Link className="link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="link" to="/task">Task</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default HeaderComponent