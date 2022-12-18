import { UserData } from '@domain/entities/user'
import { AuthContextType } from '@infrastructure/contexts/auth.context'
import { Fetcher } from '@infrastructure/services/fetcher'

type LoginParams = {
  email: string
  password: string
  updateAuth: AuthContextType['updateAuth']
  setError: (error: boolean) => void
}

export function login({ email, password, updateAuth, setError }: LoginParams) {
  Fetcher.post<{
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
    })
    .catch(error => {
      console.error(error)
      setError(true)
    })
}
