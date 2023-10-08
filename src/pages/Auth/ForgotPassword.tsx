import { Col, Form, Input, Button, Divider, notification, Steps } from 'antd'
import { BigText, InputCard, SmallText } from '../../styles/AuthStyles'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateMessages } from '../../utils/input_validation';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthService } from '../../services/auth_service';

const ForgotsPassword = () => {

    const [ steps, setSteps ] = useState<number>(0)
    const [ uid, setUid ] = useState<string>('')

    const { setUserEntry } = useContext(AppContext)
    const [form] = Form.useForm()
    const authService = new AuthService()

    const sendVerificationCode = async(data: { email: string }) => {
        const { email } = data
        if(!email.trim()){
            return notification.error({
                message: 'El email es requerido'
            })
        }
        try {
            const res = await authService.SendVerificationCode({ email, repassword: true })
            if(res.status !== 200){
                return notification.error({
                  message: res?.data?.msg || "Inténtalo nuevamente."
                })
            }
            notification.success({
                message: 'Código enviado a tu correo, revisa tu bandeja de entrada.'
            })
            setUid(res.data.uid)
            setSteps(1)
        } catch (error: any) {
            return notification.error({
                message: error?.response?.data?.msg ||'¡Upss! Ha ocurrido un error. Intenta nuevamente.'
            })
        }
    }

    const validateAccount = async(data: { code: string }) => {
        const { code } = data
        if(!code.trim()){
            return notification.error({
                message: 'El código es requerido'
            })
        }
        const request = {
            uid,
            code
        }
        try {
            const res = await authService.VerificateRepassword(request)
            if(res.status !== 200){
                return notification.error({
                  message: res?.data?.msg || "Inténtalo nuevamente."
                })
            }
            notification.success({
                message: 'Usuario verificado correctamente, reestablece tu contraseña'
            })
            setSteps(2)
        } catch (error: any) {
            return notification.error({
                message: error?.response?.data?.msg ||'¡Upss! Ha ocurrido un error. Intenta nuevamente.'
            })
        }
    }

    const createNewPassword = async(data: { password: string }) => {
        const { password } = data
        if(!password.trim()){
            return notification.error({
                message: 'La contraseña es requerida'
            })
        }

        try {
            const res = await authService.NewPassword({ uid, password })
            if(res.status !== 200){
                return notification.error({
                    message: res?.data?.msg || "Inténtalo nuevamente."
                })
            }
            notification.success({
                message: "Contraseña restablecida correctamente."
            })
            setUserEntry('login')
        } catch (error: any) {
            return notification.error({
                message: error?.response?.data?.msg ||'¡Upss! Ha ocurrido un error. Intenta nuevamente.'
            })
        }

    }

    const selectStep = () => {
        switch (steps) {
            case 0:
                return (
                    <>
                        <SmallText textAlign='left'>Enviaremos un código <span style={{ color:"#0366d6" }}>a tu correo</span></SmallText>
                        <BigText textAlign='left'>Nueva contraseña</BigText>

                        <Form form={form} onFinish={sendVerificationCode} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                            <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
                                <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width:'100%' }}>Enviar código</Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            case 1:
                return (
                    <>
                        <SmallText textAlign='left'>Ingresa el código enviado <span style={{ color:"#0366d6" }}>a tu correo</span></SmallText>
                        <BigText textAlign='left'>Nueva contraseña</BigText>

                        <Form form={form} onFinish={validateAccount} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                            <Form.Item name="code" rules={[{ required: true }, { min:6, message:'Mínimo 6 dígitos' }, { max:6, message:'Máximo 6 dígitos' }]} style={{ margin:'2em 0' }}>
                                <Input prefix={<LockOutlined />} placeholder='Código' />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width:'100%' }}>Enviar código</Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            case 2:
                return (
                    <>
                        <SmallText textAlign='left'>Crea tu nueva <span style={{ color:"#0366d6" }}>contraseña</span></SmallText>
                        <BigText textAlign='left'>Nueva contraseña</BigText>

                        <Form form={form} onFinish={createNewPassword} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
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
                                <Button type="primary" htmlType="submit" style={{ width:'100%' }}>Enviar código</Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            default:
                break;
        }
    }

  return (
    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
    <InputCard>
    <Steps
        size='small'
        current={steps}
        items={[{ title: 'Código' }, { title: 'Verificar' }, { title: 'Contraseña' }]}
        style={{ marginBottom:'20px' }}
    />
    { selectStep() }

      <Divider> o </Divider>
      <SmallText fontSize='1em'>¿Ya tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Iniciar Sesión</span></SmallText>

    </InputCard>
  </Col>
  )
}

export default ForgotsPassword