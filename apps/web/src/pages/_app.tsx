/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../styles/index.css'

import { AuthContextProvider } from '@infrastructure/contexts/auth.context'
import { useAuth } from '@infrastructure/hooks/use-auth'
import { AppProps } from 'next/app'
import { AuthProps } from 'src/types/next'

export default function MyApp({ Component, pageProps: { auth, ...restOfTheProps } }: AppProps) {
  const { tokenRef, updateAuth, profileRef } = useAuth(
    auth ? (auth as AuthProps) : { token: undefined, profile: undefined }
  )

  return (
    <AuthContextProvider
      value={{
        token: tokenRef.current,
        profile: profileRef.current,
        updateAuth,
      }}
    >
      <Component {...restOfTheProps} />
    </AuthContextProvider>
  )
}
