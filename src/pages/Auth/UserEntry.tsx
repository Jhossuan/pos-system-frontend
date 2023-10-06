import { Col } from 'antd'
import { Row } from '../../styles/AuthStyles'
import Login from './Login';
import Register from './Register';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react'

const UserEntry = () => {

  const { userEntry } = useContext(AppContext)

  const selectScreen = () => {
    switch (userEntry) {
      case "login":
        return <Login />     
      case "register":
        return <Register />
      default:
        return <Login />
    }
  }

  return (
      <Row>
        <Col className='left_col_ue' md={24} lg={12} xl={12} style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          Imagenes
        </Col>
          { selectScreen() }
      </Row>
  )
}

export default UserEntry