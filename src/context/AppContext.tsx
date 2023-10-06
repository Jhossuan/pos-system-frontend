import { createContext, useState } from "react";

declare global {
    type ChildrenProps = {
        children?: React.ReactNode
    }
}

type UserEntryT = 'login' | 'register' | 'completeProfile' | 'auth'

interface AppContextI {
    userToken: string | null
    setUserEntry: (user: UserEntryT) => void
    userEntry: UserEntryT
}

export const AppContext = createContext<AppContextI>({
    userToken:"",
    setUserEntry: (user: string) => user,
    userEntry: 'login'
})

export const AppContextProvider = (props: ChildrenProps) => {

    const [userEntry, setUserEntry] = useState<UserEntryT>("login")

    const userToken = sessionStorage.getItem('token')

    return (
        <AppContext.Provider
            value={{
                userToken,
                userEntry,
                setUserEntry
            }}
        >
            {props.children}
        </AppContext.Provider>
    )

}