import { Col, Form, Input, Button, Divider } from 'antd'
import { BigText, InputCard, SmallText } from '../../styles/AuthStyles'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { validateMessages } from '../../utils/input_validation';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react'
// import { AuthService } from '../../services/auth_service';

const Register = () => {

  const { setUserEntry } = useContext(AppContext)
  const [form] = Form.useForm()
  // const authData = new AuthService()

  const onFinish = async(data: { email: string, password: string }) => {
    console.log(data)
    // await authData.Register()
  }
  
  return (
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          <InputCard>
            <SmallText textAlign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Jhoval Digital</span></SmallText>
            <BigText textAlign='left'>Registrarse</BigText>

          <Form form={form} onFinish={onFinish} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>

            <Form.Item name="name" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
              <Input prefix={<UserOutlined />} placeholder='Nombre' />
            </Form.Item>

            <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
              <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
            </Form.Item>

            <Form.Item 
              name="password"
              rules={[
                {required: true },
                {min: 6, message:"Minimo 6 caracteres"}
              ]}
              style={{ margin:'2em 0' }}
            >
              <Input type='password' prefix={<LockOutlined />} placeholder='Contraseña' />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('¡Las contraseñas deben coincidir!'));
                  },
                }),
              ]}
              style={{ margin:'2em 0' }}
            >
              <Input type='password' prefix={<LockOutlined />} placeholder='Repetir contraseña' />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width:'100%' }}>Crear Cuenta</Button>
              {/* <SmallText fontSize='1em' textAlign='left'><span style={{ color:"#0366d6", cursor: 'pointer' }}>Olvidé mi contraseña</span></SmallText> */}
            </Form.Item>

          </Form>

            <Divider> o </Divider>
            <SmallText fontSize='1em'>¿Ya tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Inicia sesión</span></SmallText>


          </InputCard>
        </Col>
  )
}

export default Register