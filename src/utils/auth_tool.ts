import { AppContext } from "../context/AppContext"
import { useContext } from 'react'
import { Navigate } from "react-router-dom"

export const RequireAuth = (props: any) => {
    const { userToken } = useContext(AppContext)

    if(!userToken){
        return Navigate({to: "/"})
    }

    return props.children

}

export const NotRequireAuth = (props: any) => {
    const { userToken } = useContext(AppContext)

    if(userToken){
        return Navigate({ to:"/home" })
    }

    return props.children
}