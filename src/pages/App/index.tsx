import { Routes, Route } from 'react-router-dom'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import AppLayout from '../../components/AppLayout'


//Aqui van a ir todas las rutas de react router
//También aqui va el Middleware para proteger las rutas
//Aqui también va el layout rodeando toda la App 
const Application = () => {
  return (
    <AppLayout>
      <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
      </Routes>
    </AppLayout>
  )
}

export default Application