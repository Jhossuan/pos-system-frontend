import { AppContext } from "../context/AppContext"
import { useContext } from 'react'
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = (props: any) => {
    const { userToken } = useContext(AppContext)

    if(!userToken){
        return Navigate({to: "/login"})
    }

    return props.children

}

export const PublicRoute = () => {
    const { userToken } = useContext(AppContext)

    if(userToken){
      Navigate({ to:"/" })
    }

    return
}