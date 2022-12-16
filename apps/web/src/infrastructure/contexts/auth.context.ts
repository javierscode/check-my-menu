import { UserData } from '@domain/entities/user'
import { createContext, useContext } from 'react'

type AuthContextType = {
  token?: string
  updateAuth: (token: string, profile: UserData) => void
  profile?: UserData
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }
  return context
}

export const AuthContextProvider = AuthContext.Provider
