import { Col, Form, Input, Button, Divider, notification } from 'antd'
import { BigText, InputCard, SmallText } from '../../styles/AuthStyles'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateMessages } from '../../utils/input_validation';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthService } from '../../services/auth_service';

const Login = () => {

  const { setUserEntry } = useContext(AppContext)
  const [form] = Form.useForm()
  const authData = new AuthService()

  const onFinish = async(data: { email: string, password: string }) => {
    const { email, password } = data;
    if(!email.trim() || !password.trim()){
      return notification.error({
        message: "Todos los campos son requeridos"
      })
    }
    try {
        const res = await authData.Login(data)
        if(res.status !== 200){
          return notification.error({
            message: res?.data?.msg || "Inténtalo nuevamente."
          })
        }
        sessionStorage.setItem('token', res.data.token)
        location.reload()
    } catch (error: any) {
        return notification.error({
          message: error?.response?.data?.msg ||'¡Upss! Ha ocurrido un error. Intenta nuevamente.'
        })
    }   
  }
  
  return (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
          <InputCard>
            <SmallText textAlign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Jhoval Digital</span></SmallText>
            <BigText textAlign='left'>Iniciar Sesión</BigText>

          <Form form={form} onFinish={onFinish} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>

            <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
              <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
              <Input type='password' prefix={<LockOutlined />} placeholder='Contraseña' />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width:'100%' }}>Iniciar Sesión</Button>
                <SmallText fontSize='1em' textAlign='left'><span style={{ color:"#0366d6", cursor: 'pointer' }} onClick={() => setUserEntry('forgotPassword')}>Olvidé mi contraseña</span></SmallText>
            </Form.Item>

          </Form>

            <Divider> o </Divider>
            <SmallText fontSize='1em'>¿No tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('register')}>Registrarse</span></SmallText>
            <SmallText fontSize='1em' textAlign='center'><span style={{ color:"#0366d6", cursor: 'pointer' }} onClick={() => setUserEntry('verificateAccount')}>Verificar Cuenta</span></SmallText>


          </InputCard>
        </Col>
  )
}

export default Login