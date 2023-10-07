import { Routes, Route } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import { RequireAuth, NotRequireAuth } from '../../utils/auth_tool'
import Home from '../Home/Home'
import UserEntry from '../Auth/UserEntry'

const Application = () => {
  return (
    <AppLayout>
      <Routes>

  {/* ----------------- RUTAS PROTEGIDAS ------------------  */}
          <Route path='/home' element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }/>

  {/* ----------------- RUTAS PUBLICAS ------------------  */}
          <Route path='/' element={
            <NotRequireAuth>
              <UserEntry />
            </NotRequireAuth>
          }/>

      </Routes>
    </AppLayout>
  )
}

export default Application