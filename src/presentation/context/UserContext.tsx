import { UserModel } from 'domain/models/UserModel'
import { createContext, ReactNode, useState } from 'react'

type UserContextData = {
  user: UserModel | undefined
  handleSetUser: (data: UserModel) => void
}

export const UserContext = createContext({} as UserContextData)

interface UserContextProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<UserModel | undefined>()

  console.log('USER CONTEXT', user)

  function handleSetUser(data: UserModel) {
    setUser(data)
  }

  return (
    <UserContext.Provider value={{ user, handleSetUser }}>
      {children}
    </UserContext.Provider>
  )
}
