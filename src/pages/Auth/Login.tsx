import { Row, Col } from 'antd'
import { PublicRoute } from '../../utils/auth_tool'

const Login = () => {
  
  PublicRoute()

  return (
    <Row style={{ height:'100%', width:'100%' }}>
      <Col sm={24} md={12} lg={12} style={{ background: "#FFA500", display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>Espacio 1</Col>
      <Col sm={24} md={12} lg={12} style={{ background: "#333333", display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>Espacio 2</Col>
    </Row>
  )
}

export default Login