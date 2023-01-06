import { AuthContextType } from '@client/contexts/auth.context'
import { UserData } from '@shared/domain/entities/user'
import { Fetcher } from '@shared/infrastructure/fetcher'
import { NextRouter } from 'next/router'

type RegisterParams = {
  name: string
  lastname: string
  email: string
  password: string
  updateAuth: AuthContextType['updateAuth']
  setError: (error: boolean) => void
  router: NextRouter
}

export function registerNewUser({
  name,
  lastname,
  email,
  password,
  updateAuth,
  setError,
  router,
}: RegisterParams) {
  Fetcher.post<{
    token: string
    profile: UserData
  }>('/api/auth/register', { body: { name, lastname, email, password } })
    .then(({ error, data }) => {
      if (error || !data) {
        console.error(error)
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
