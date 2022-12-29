import { logout } from '@client/infrastructure/api/user/logout.fetch'
import { fireEvent, render, screen } from '@testing-library/react'

import { AdminNavbar } from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@client/infrastructure/contexts/auth.context', () => ({
  useAuthContext: () => ({
    profile: {
      name: 'Test',
      lastname: 'User',
    },
    updateAuth: jest.fn(),
  }),
}))

jest.mock('../../../../infrastructure/api/user/logout.fetch', () => ({
  logout: jest.fn(),
}))

describe('#AdminNavbar', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      render(<AdminNavbar />)

      const navigation = screen.getByRole('navigation')

      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveTextContent('Check my menu')
      expect(navigation).toHaveTextContent('Test User')
    })
  })
  describe('when clicked on logout icon', () => {
    it('should call logout function', () => {
      render(<AdminNavbar />)

      const logoutIcon = screen.getByTestId('logout-icon')

      fireEvent.click(logoutIcon)

      expect(logout).toHaveBeenCalled()
    })
  })
})
