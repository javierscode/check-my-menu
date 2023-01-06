/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '@client/styles/index.css'

import { AuthContextProvider } from '@client/contexts/auth.context'
import { useAuth } from '@client/hooks/use-auth'
import { AuthProps } from '@shared/types/next'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps: { auth, ...restOfTheProps } }: AppProps) {
  const safeAuth = auth ? (auth as AuthProps) : { token: null, profile: null }
  const { tokenRef, updateAuth, profileRef } = useAuth(safeAuth)

  return (
    <AuthContextProvider
      value={{
        token: tokenRef.current,
        profile: profileRef.current,
        updateAuth,
      }}
    >
      <Component {...restOfTheProps} />
      <div id='modal'></div>
    </AuthContextProvider>
  )
}
