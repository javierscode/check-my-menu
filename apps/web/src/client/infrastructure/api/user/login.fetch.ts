import { AuthContextType } from '@client/infrastructure/contexts/auth.context'
import { UserData } from '@shared/domain/entities/user'
import { Fetcher } from '@shared/infrastructure/fetcher'
import { NextRouter } from 'next/router'

type LoginParams = {
  email: string
  password: string
  updateAuth: AuthContextType['updateAuth']
  setError: (error: boolean) => void
  router: NextRouter
}

export function login({ email, password, updateAuth, setError, router }: LoginParams) {
  return Fetcher.post<{
    token: string
    profile: UserData
  }>('/api/auth/login', { body: { email, password } })
    .then(({ error, data }) => {
      if (error || !data) {
        console.error(error)
        setError(true)
        return
      }
      const { token, profile } = data
      updateAuth(token, profile)
      router.push('/admin')
    })
    .catch(error => {
      console.error(error)
      setError(true)
    })
}
