import { Routes, Route } from 'react-router-dom'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import AppLayout from '../../components/AppLayout'
import { ProtectedRoutes } from '../../utils/auth_tool'
import Home from '../Home/Home'

const Application = () => {
  return (
    <AppLayout>
      <Routes>

  {/* ----------------- RUTAS PROTEGIDAS ------------------  */}
          <Route path='/' element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>}
          />

  {/* ----------------- RUTAS PUBLICAS ------------------  */}
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>

      </Routes>
    </AppLayout>
  )
}

export default Application