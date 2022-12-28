import { render, screen } from '@testing-library/react'

import { CategoryCard, CategoryCardProps } from '.'

describe('#CategoryCard', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: CategoryCardProps = {
        category: {
          id: '1',
          name: 'Test',
          description: 'Description',
          image: '/test',
          restaurantId: '1',
        },
        href: '/category/1',
      }

      render(<CategoryCard {...props} />)

      const card = screen.getByRole('link')

      expect(card).toHaveStyle({
        '--image-url': 'url(/test)',
      })
      expect(card).toHaveTextContent('Test')
      expect(card).toHaveTextContent('Description')
    })
  })
})
