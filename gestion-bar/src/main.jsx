
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contextos/AuthContext'
import './estilos/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './vistas/App.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>

)
