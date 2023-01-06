import { UserData } from '@shared/domain/entities/user'
import { AuthProps } from '@shared/types/next'
import { useRef, useState } from 'react'

export const useAuth = ({ token, profile }: AuthProps) => {
  const tokenRef = useRef<string | null>(null)
  const profileRef = useRef<UserData | null>(null)
  const [, setDummy] = useState(true)

  const updateAuth = (newToken?: string, newProfile?: UserData) => {
    if (
      newToken === tokenRef.current &&
      JSON.stringify(newProfile) === JSON.stringify(profileRef.current)
    )
      return

    tokenRef.current = newToken ?? null
    profileRef.current = newProfile ?? null
    setDummy(prev => !prev)
  }

  if (token !== undefined && token !== null && token !== tokenRef.current) tokenRef.current = token
  if (profile !== undefined && profile !== null && profile !== profileRef.current)
    profileRef.current = profile

  return { tokenRef, profileRef, updateAuth }
}
