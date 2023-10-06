import axios from "axios"
import { ProfileSchema, RegisterSchema } from "../types/services/auth"
axios.defaults.baseURL = "http://localhost:3000/v1/"

export class AuthService {

    Register = async (data: RegisterSchema) => {
        return await axios.post('auth/register', data)
    }

    CompleteProfile = async (data: ProfileSchema) => {
        return await axios.post('auth/complete-profile', data)
    }

    SendVerificationCode = async (data: {email: string, repassword?: boolean}) => {
        return await axios.post('auth/verification-code', data)
    }

    VerificateAccount = async (data: { uid: string, code: string }) => {
        return await axios.post('auth/verificate-account', data)
    }

    Login = async (data: { email: string, password: string }) => {
        return await axios.post('auth/login', data)
    }
}