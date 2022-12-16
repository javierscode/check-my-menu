import { UserData } from '@domain/entities/user'
import { useRef, useState } from 'react'
import { AuthProps } from 'src/types/next'

export const useAuth = ({ token, profile }: AuthProps) => {
  const tokenRef = useRef<string>()
  const profileRef = useRef<UserData>()
  const [, setDummy] = useState(true)

  const updateAuth = (newToken: string, newProfile: UserData) => {
    if (
      newToken === tokenRef.current &&
      JSON.stringify(newProfile) === JSON.stringify(profileRef.current)
    )
      return

    tokenRef.current = newToken
    profileRef.current = newProfile
    setDummy(prev => !prev)
  }

  if (token !== undefined && token !== null && token !== tokenRef.current) tokenRef.current = token
  if (profile !== undefined && profile !== null && profile !== profileRef.current)
    profileRef.current = profile

  return { tokenRef, profileRef, updateAuth }
}
