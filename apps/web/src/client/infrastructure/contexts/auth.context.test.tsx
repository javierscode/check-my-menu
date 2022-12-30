import { render, renderHook } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

import { AuthContextProvider, AuthContextType, useAuthContext } from './auth.context'

const authContext: AuthContextType = {
  profile: {
    id: '1',
    name: 'John',
    lastname: 'Doe',
    email: 'test@gmail.com',
  },
  token: '1',
  updateAuth: jest.fn(),
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider value={authContext}>{children}</AuthContextProvider>
}

describe('AuthContext', () => {
  describe('when useAuthContext is called', () => {
    it('should return the auth context', () => {
      const { result } = renderHook(() => useAuthContext(), { wrapper: Wrapper })
      expect(result.current).toEqual(authContext)
    })
  })
})
