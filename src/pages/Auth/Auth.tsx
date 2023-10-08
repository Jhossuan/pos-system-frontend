import { Col, Form, Input, Button, Divider, notification, Steps } from 'antd'
import { BigText, InputCard, SmallText } from '../../styles/AuthStyles'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateMessages } from '../../utils/input_validation';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthService } from '../../services/auth_service';

const Auth = () => {

    const [ steps, setSteps ] = useState<number>(0)
    const [ uid, setUid ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)

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
            setLoading(true)
            const res = await authService.SendVerificationCode({ email })
            if(res.status !== 200){
                return notification.error({
                  message: res?.data?.msg || "Inténtalo nuevamente."
                })
            }
            notification.success({
                message: 'Código enviado a tu correo, revisa tu bandeja de entrada.'
            })
            setUid(res.data.uid)
            form.resetFields()
            setLoading(false)
            setSteps(1)
        } catch (error: any) {
            setLoading(false)
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
            setLoading(true)
            const res = await authService.VerificateAccount(request)
            if(res.status !== 200){
                return notification.error({
                  message: res?.data?.msg || "Inténtalo nuevamente."
                })
            }
            notification.success({
                message: 'Usuario verificado correctamente'
            })
            setSteps(1)
            form.resetFields()
            setLoading(false)
            setUserEntry('login')
        } catch (error: any) {
            setLoading(false)
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
                        <BigText textAlign='left'>Verifica tu cuenta</BigText>

                        <Form form={form} onFinish={sendVerificationCode} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                            <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
                                <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%' }}>{ loading ? 'Cargando ...' : 'Enviar código' }</Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            case 1:
                return (
                    <>
                        <SmallText textAlign='left'>Ingresa el código enviado <span style={{ color:"#0366d6" }}>a tu correo</span></SmallText>
                        <BigText textAlign='left'>Verifica tu cuenta</BigText>

                        <Form form={form} onFinish={validateAccount} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                            <Form.Item name="code" rules={[{ required: true }, { min:6, message:'Mínimo 6 dígitos' }, { max:6, message:'Máximo 6 dígitos' }]} style={{ margin:'2em 0' }}>
                                <Input prefix={<LockOutlined />} placeholder='Código' />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%' }}>{ loading ? 'Cargando ...' : 'Verificar cuenta' }</Button>
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
        size='default'
        current={steps}
        items={[{ title: 'Generar código' }, { title: 'Verificar' }]}
        style={{ marginBottom:'20px' }}
    />
    { selectStep() }

      <Divider> o </Divider>
      <SmallText fontSize='1em'>¿Ya estás verificado? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Iniciar Sesión</span></SmallText>

    </InputCard>
  </Col>
  )
}

export default Auth