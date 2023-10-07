import { Col, Form, Input, Button, Divider, notification, Steps, Select } from 'antd'
import { BigText, InputCard, SmallText } from '../../styles/AuthStyles'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons';
import { validateMessages } from '../../utils/input_validation';
import { AppContext } from '../../context/AppContext';
import { useContext, useState } from 'react'
import { AuthService } from '../../services/auth_service';
import { ProfileSchema, RegisterSchema } from '../../types/services/auth';

const Register = () => {

  const [ step, setStep ] = useState<number>(0)
  const [ uid, setUid ] = useState<string>("")

  const { setUserEntry } = useContext(AppContext)
  const [form] = Form.useForm()
  const authData = new AuthService()

  const onFinishRegister = async(data: { name: string, email: string, password: string }) => {
    const { name, email, password } = data
    if(!name.trim() || !email.trim() || !password.trim()){
      return notification.error({
        message: 'Todos los campos son requeridos'
      })
    }
    const request: RegisterSchema = {
      name,
      email,
      password,
      metadata: {
        subscription: "FREE"
      }
    }
    try {
      const res = await authData.Register(request)
      if(res.status !== 200){
        return notification.error({
          message: res?.data?.msg || "Inténtalo nuevamente."
        })
      }
      notification.success({
        message: "¡Usuario creado correctamente!"
      })
      setUid(res.data.uid)
      setStep(1)
    } catch (error: any) {
      return notification.error({
        message: error?.response?.data?.msg ||'¡Upss! Ha ocurrido un error. Intenta nuevamente.'
      })
    }
  }

  const onFinishProfile = async(data:{country:'CO', phone:number, company: string}) => {
    const { country, phone, company } = data

    if(!country || !phone || !company.trim()){
      return notification.error({
        message: 'Todos los campos son requeridos'
      })
    }
    const request: ProfileSchema = {
      uid,
      phone: "+57" + phone.toString(),
      country,
      company,
      position: 'OWNER'
    }
    try {
      const res = await authData.CompleteProfile(request)
      if(res.status !== 200){
        return notification.error({
          message: res?.data?.msg || "Inténtalo nuevamente."
        })
      }
      notification.success({
        message: "¡Perfil creado correctamente!"
      })
      setUserEntry('login')
    } catch (error: any) {
      return notification.error({
        message: error?.response?.data?.msg ||'¡Upss! Ha ocurrido un error. Intenta nuevamente.'
      })
    }

  }

  const switchStep = () => {
    switch (step) {
      case 0:
        return (
          <>
              <SmallText textAlign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Jhoval Digital</span></SmallText>
              <BigText textAlign='left'>Registrarse</BigText>

            <Form form={form} onFinish={onFinishRegister} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>

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
                <Button type="primary" htmlType="submit" style={{ width:'100%' }}>Crear Usuario</Button>
                {/* <SmallText fontSize='1em' textAlign='left'><span style={{ color:"#0366d6", cursor: 'pointer' }}>Olvidé mi contraseña</span></SmallText> */}
              </Form.Item>

            </Form>

              <Divider> o </Divider>
              <SmallText fontSize='1em'>¿Ya tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Inicia sesión</span></SmallText>
          </>
        )
      case 1:
        return (
          <>
            <SmallText textAlign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Jhoval Digital</span></SmallText>
            <BigText textAlign='left'>Crear Perfil</BigText>

            <Form form={form} onFinish={onFinishProfile} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>

              <Form.Item name="country" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
                <Select
                  placeholder='Selecciona tu país'
                  options={[
                    { label:'🇨🇴 Colombia', value:'CO' }
                  ]}
                />
              </Form.Item>

              <Form.Item name="phone" rules={[{ required: true }, {min: 10, message:"Mínimo 10 dígitos"}, {max: 10, message:"Máximo 10 dígitos"}]} style={{ margin:'2em 0' }}>
                <Input type='number' prefix={"+57"} placeholder='Celular / Télefono' />
              </Form.Item>

              <Form.Item 
                name="company"
                rules={[{required: true },{min: 4, message:"Minimo 4 caracteres"}]}
                style={{ margin:'2em 0' }}
              >
                <Input prefix={<ShopOutlined />} placeholder='Nombre del negocio / tienda' />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width:'100%' }}>Crear Perfil</Button>
                {/* <SmallText fontSize='1em' textAlign='left'><span style={{ color:"#0366d6", cursor: 'pointer' }}>Olvidé mi contraseña</span></SmallText> */}
              </Form.Item>

            </Form>

              <Divider> o </Divider>
              <SmallText fontSize='1em'>¿Ya tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Inicia sesión</span></SmallText>
          </>
        )
    }
  }
  
  return (
      <>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          <InputCard>
            <Steps
                size='default'
                current={step}
                items={[{ title: 'Registro' }, { title: 'Perfil' }]}
                style={{ marginBottom:'20px' }}
            />
            { switchStep() }
          </InputCard>
        </Col>
      </>
  )
}

export default Register