import { AuthContextType } from '@client/infrastructure/contexts/auth.context'
import { Fetcher } from '@shared/infrastructure/fetcher'
import { NextRouter } from 'next/router'

type logoutParams = {
  updateAuth: AuthContextType['updateAuth']
  router: NextRouter
}

export function logout({ updateAuth, router }: logoutParams) {
  try {
    Fetcher.post('/api/auth/logout').then(({ error }) => {
      if (error) {
        console.error(error)
        return
      }
      updateAuth()
      router.push('/login')
    })
  } catch (error) {
    console.error(error)
  }
}
