import { Routes, Route } from 'react-router-dom'
import Register from '../Auth/Register'
import Login from '../Auth/Login'


//Aqui van a ir todas las rutas de react router
//También aqui va el Middleware para proteger las rutas
//Aqui también va el layout rodeando toda la App 
const Application = () => {
  return (
    <Routes>

        <Route path='/register' element={ <Register /> } />
        <Route path='/login' element={ <Login /> } />

    </Routes>
  )
}

export default Application