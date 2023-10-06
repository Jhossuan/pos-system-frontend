import { Routes, Route } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import { ProtectedRoutes, PublicRoute } from '../../utils/auth_tool'
import Home from '../Home/Home'
import UserEntry from '../Auth/UserEntry'

const Application = () => {
  return (
    <AppLayout>
      <Routes>

  {/* ----------------- RUTAS PROTEGIDAS ------------------  */}
          <Route path='/home' element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>}
          />

  {/* ----------------- RUTAS PUBLICAS ------------------  */}
          <Route path='/' element={
            <PublicRoute>
              <UserEntry />
            </PublicRoute>
          }/>

      </Routes>
    </AppLayout>
  )
}

export default Application