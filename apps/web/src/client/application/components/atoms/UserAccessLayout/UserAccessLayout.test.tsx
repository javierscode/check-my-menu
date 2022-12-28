import { render, screen } from '@testing-library/react'

import { UserAccessLayout, UserAccessLayoutProps } from '.'

describe('#UserAccessLayout', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: UserAccessLayoutProps = {
        children: <div>children</div>,
        imageUrl: '/imageUrl',
        title: 'title',
        subTitle: 'subTitle',
        link: {
          text: 'text',
          to: 'to',
          introduction: 'introduction',
        },
      }

      render(<UserAccessLayout {...props} />)

      const grid = screen.getByRole('grid')

      expect(grid).toBeInTheDocument()
      expect(grid).toHaveTextContent('Check My Menu')
      expect(grid).toHaveTextContent('title')
      expect(grid).toHaveTextContent('subTitle')
      expect(grid).toHaveTextContent('children')
      expect(grid).toHaveTextContent('introduction')

      const link = screen.getByRole('link')

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('text')
      expect(link).toHaveAttribute('href', 'to')

      const image = screen.getByRole('img')

      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/_next/image?url=%2FimageUrl&w=3840&q=75')
      expect(image).toHaveAttribute('alt', 'title')
    })
  })
})
