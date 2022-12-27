import { generateQr } from '@client/infrastructure/api/generate-qr.fetch'
import { render, screen } from '@testing-library/react'

import { AdminAside, AdminAsideProps } from '.'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: 'http://localhost:3000/admin/1/categories',
    }
  },
}))

jest.mock('@client/infrastructure/api/generate-qr.fetch', () => ({
  generateQr: jest.fn(),
}))

describe('#AdminAside', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: AdminAsideProps = {
        restaurantId: '1',
        restaurantName: 'Test restaurant',
        restaurantDomain: 'test-restaurant',
      }
      render(<AdminAside {...props} />)

      const aside = screen.getByRole('menu')
      const title = screen.getByRole('heading', { level: 2 })

      expect(aside).toBeDefined()
      expect(title).toHaveTextContent('Test restaurant')

      const linksContainer = screen.getByRole('navigation')
      const links = Array.from(linksContainer.querySelectorAll('a'))

      expect(linksContainer).toBeDefined()
      expect(links).toHaveLength(2)
      expect(links.map(link => link.textContent)).toEqual(['Categories', 'Dishes'])
      expect(links.map(link => link.getAttribute('href'))).toEqual([
        '/admin/1/categories',
        '/admin/1/dishes',
      ])

      const footer = screen.getByRole('complementary')
      const footerLink = footer.querySelector('a')
      const footerButtons = Array.from(footer.querySelectorAll('button'))

      expect(footer).toBeDefined()
      expect(footerLink).toHaveTextContent('Back to restaurants')
      expect(footerLink).toHaveAttribute('href', '/admin')

      expect(footerButtons).toHaveLength(2)
      expect(footerButtons.map(button => button.textContent)).toEqual([
        'See Preview',
        'Download QR',
      ])
    })
  })

  describe('when clicked on "Download QR" button', () => {
    it('should call generateQr with correct params', () => {
      const props: AdminAsideProps = {
        restaurantId: '1',
        restaurantName: 'Test restaurant',
        restaurantDomain: 'test-restaurant',
      }
      render(<AdminAside {...props} />)

      const button = screen.getByRole('button', { name: 'Download QR' })
      button.click()

      expect(generateQr).toHaveBeenCalledWith('http://localhost/test-restaurant')
    })
  })
})
