import { CategoryService } from '@domain/services/category.service'
import { COOKIE_AUTH_KEY } from '@infrastructure/constants'
import { MockCategoryService } from '@test/infrastructure/services/mock-category.service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function createCategoryHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { name, description, image, restaurantId, ...rest } = req.body as Record<string, unknown>
  if (
    !name ||
    !description ||
    !image ||
    !restaurantId ||
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof image !== 'string' ||
    typeof restaurantId !== 'string'
  ) {
    return res.status(400).send('Missing name, description or image')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')

  const CategoryService: CategoryService = new MockCategoryService()

  try {
    const category = await CategoryService.createCategory(token, {
      name,
      description,
      image,
      restaurantId,
    })

    return res.status(201).json({ category })
  } catch (error) {
    return res.status(500).end()
  }
}
