import { render, screen } from '@testing-library/react'

import { Navbar, NavbarProps } from '.'

describe('#Navbar', () => {
  describe('when is rendered', () => {
    it('should render correctly', () => {
      const props: NavbarProps = {
        restaurantTitle: 'Restaurant Title',
        backTo: '/backTo',
        currentLocation: 'currentLocation',
      }
      render(<Navbar {...props} />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', props.backTo)

      const title = screen.getByRole('heading', { name: props.currentLocation })
      expect(title).toBeInTheDocument()

      const restaurantTitle = screen.getByRole('heading', { name: props.restaurantTitle })
      expect(restaurantTitle).toBeInTheDocument()
    })
  })
})
