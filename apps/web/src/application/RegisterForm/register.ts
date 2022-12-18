import { UserData } from '@domain/entities/user'
import { AuthContextType } from '@infrastructure/contexts/auth.context'
import { Fetcher } from '@infrastructure/services/fetcher'

type RegisterParams = {
  name: string
  lastname: string
  email: string
  password: string
  updateAuth: AuthContextType['updateAuth']
}

export function registerNewUser({ name, lastname, email, password, updateAuth }: RegisterParams) {
  try {
    Fetcher.post<{
      token: string
      profile: UserData
    }>('/api/auth/register', { body: { name, lastname, email, password } }).then(
      ({ error, data }) => {
        if (error || !data) {
          console.error(error)
          return
        }
        const { token, profile } = data
        updateAuth(token, profile)
      }
    )
  } catch (error) {
    console.error(error)
  }
}
