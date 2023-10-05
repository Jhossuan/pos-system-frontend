import { createContext, useState } from "react";

declare global {
    type ChildrenProps = {
        children?: React.ReactNode
    }
}

interface AppContextI {
    user: string
    setUser: (user: string) => void
    userToken: any
}

export const AppContext = createContext<AppContextI>({
    user: "User Test",
    setUser: () => {},
    userToken:""
})

export const AppContextProvider = (props: ChildrenProps) => {

    const [user, setUser] = useState("Test")

    const userToken = false

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                userToken
            }}
        >
            {props.children}
        </AppContext.Provider>
    )

}