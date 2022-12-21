/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../styles/index.css'

import { AuthContextProvider } from '@client/infrastructure/contexts/auth.context'
import { useAuth } from '@client/infrastructure/hooks/use-auth'
import { AuthProps } from '@shared/types/next'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps: { auth, ...restOfTheProps } }: AppProps) {
  const { tokenRef, updateAuth, profileRef } = useAuth(auth as AuthProps)

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
