import { createContext, useState } from "react";

declare global {
    type ChildrenProps = {
        children?: React.ReactNode
    }
}

interface AppContextI {
    user: string
    setUser: (user: string) => void
}

export const AppContext = createContext<AppContextI>({
    user: "User Test",
    setUser: () => {}
})

export const AppContextProvider = (props: ChildrenProps) => {

    const [user, setUser] = useState("Test")

    return (
        <AppContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {props.children}
        </AppContext.Provider>
    )

}