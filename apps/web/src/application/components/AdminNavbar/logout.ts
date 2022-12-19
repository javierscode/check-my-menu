import { AuthContextType } from '@infrastructure/contexts/auth.context'
import { Fetcher } from '@infrastructure/services/fetcher'
import { NextRouter, Router } from 'next/router'

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
