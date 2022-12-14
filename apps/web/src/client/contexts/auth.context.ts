import { UserData } from '@shared/domain/entities/user'
import { createContext, useContext } from 'react'

export type AuthContextType = {
  token: string | null
  profile: UserData | null
  updateAuth: (token?: string, profile?: UserData) => void
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
