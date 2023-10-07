import axios from "axios"
import { ProfileSchema, RegisterSchema } from "../types/services/auth"
axios.defaults.baseURL = "http://localhost:3000/v1/"

export class AuthService {

    async Register(data: RegisterSchema) {
        return await axios.post('auth/register', data)
    }

    async CompleteProfile(data: ProfileSchema) {
        return await axios.post('auth/complete-profile', data)
    }

    async SendVerificationCode(data: {email: string, repassword?: boolean}) {
        return await axios.post('auth/verification-code', data)
    }

    async VerificateAccount(data: { uid: string, code: string }) {
        return await axios.post('auth/verificate-account', data)
    }

    async Login(data: { email: string, password: string }){
        return await axios.post('auth/login', data)
    }
}